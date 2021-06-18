import * as fs from 'fs';
import { sep, extname } from 'path';
import { Container } from '../dependency';
import { Filesystem } from '../filesystem';

export class Router {
    private readonly kernel;
    protected fileSystem: Filesystem;
    protected mapControllers: Map<string, any>;
    private readonly controllerPath: string;
    private readonly controllerFolder = 'Controller';

    constructor() {
        this.kernel = Container.get('kernel');
        this.mapControllers = new Map();
        this.fileSystem = new Filesystem();
        this.controllerPath =
            this.kernel.getSrcFolder() + sep + this.controllerFolder;
    }

    public static create(): Router {
        return new Router();
    }

    public async init(): Promise<void> {
        this.loadControllers();
        await this.kernel.loadRoute(this.mapControllers);
    }

    // TODO необходимо загружать контроллеры из всех вложенных папок и отрефакторить, очень много повторов с импортом бандлов и конфигов
    protected loadControllers() {
        const files = fs.readdirSync(this.controllerPath);

        for (const file of files) {
            const filePath = this.controllerPath + sep + file;
            const isFile = fs.statSync(filePath).isFile();

            if (isFile && extname(file) === '.js') {
                const file = this.fileSystem.includeFile(filePath);
                if (file === null || typeof file !== 'object') return;

                const controllerName = Object.keys(file).shift();
                const controllerObject = new file[controllerName]();

                this.mapControllers.set(controllerName, controllerObject);
            }
        }

        return this.mapControllers;
    }
}

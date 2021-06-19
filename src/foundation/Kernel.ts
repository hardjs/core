import * as express from 'express';
import { Bundle } from './Bundle';
import { Config } from '../config';
import { Router } from '../routing';
import { IKernel } from './interfaces';
import { Filesystem } from '../filesystem';
import { Container, IContainer } from '../dependency';

export abstract class Kernel implements IKernel<Kernel> {
    protected app;
    protected config;
    protected appRoot;
    protected srcFolder = 'src';
    protected package = '@hardjs';
    protected container: IContainer;
    protected fileSystem: Filesystem;
    protected readonly version: string = '1.0.0';

    protected constructor() {
        this.container = Container;
        this.initializeApplication();
        this.fileSystem = new Filesystem();
    }

    public abstract initializeKernel(): void;
    public abstract loadRoute(controllers: Map<string, any>): void;

    private initializeApplication(): void {
        this.app = express();
        this.container.set('app', this.app);
    }

    public async handle(): Promise<Kernel> {
        if (!this.appRoot) {
            throw new Error(
                'Cannot start http server, make sure to register the app root inside index.ts file',
            );
        }

        this.initializeKernel();
        this.initializeConfig();
        await this.initializeBundles();

        this.app.disable('x-powered-by');
        await Router.create().init();
        return this;
    }

    private initializeConfig(): void {
        this.config = new Config();
        this.container.set('config', this.config);
    }

    private async initializeBundles(): Promise<void | Error> {
        const bundles = this.config.get('application.bundles');
        if (bundles && bundles.length > 0) {
            for (const bundle of bundles) {
                const isModule = bundle.search(this.package);
                const path =
                    this.appRoot + this.fileSystem.separator() + bundle + '.js';

                let fileBundle = this.fileSystem.includeFile(path);
                if (isModule !== -1) {
                    fileBundle = this.fileSystem.includeModule(bundle);
                }

                if (fileBundle === null || typeof fileBundle !== 'object') {
                    continue;
                }

                const bundleName = Object.keys(fileBundle).shift();
                const bundleObject = new fileBundle[bundleName]();
                if (bundleObject instanceof Bundle) {
                    await bundleObject.boot(this.container);
                } else {
                    throw new Error(
                        `${bundleName} class must extends abstract class Bundle`,
                    );
                }
            }
        }
    }

    public listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server app listening at http://localhost:${port}`);
        });
    }

    public getVersion(): string {
        return this.version;
    }

    public setAppRoot(folder: string): Kernel {
        this.appRoot = folder;
        return this;
    }

    public getAppRoot(): string {
        return this.appRoot;
    }

    public getSrcFolder() {
        return this.getAppRoot() + this.fileSystem.separator() + this.srcFolder;
    }
}

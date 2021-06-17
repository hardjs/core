import * as fs from 'fs';
import * as _ from 'lodash';
import { sep, extname } from 'path';
import { Container } from '../dependency';

export class Config {
    private config = {};
    private readonly kernel;
    private readonly path: string;
    private readonly folder: string = 'config';
    private excludeFiles: Array<string> = ['routes.js'];

    public constructor(path?: string) {
        this.kernel = Container.get('kernel');

        this.path = path;
        if (path === undefined) {
            this.path = this.kernel.getAppRoot() + sep + this.folder;
        }
        this.importConfig();
    }

    private importConfig(): void {
        const files = fs.readdirSync(this.path);

        for (const file of files) {
            if (this.excludeFiles.indexOf(file) !== -1) continue;

            const filePath = this.path + sep + file;
            const isFile = fs.statSync(filePath).isFile();

            if (isFile && extname(file) === '.js') {
                this.config = Object.assign(this.config, require(filePath));
            }
        }
    }

    public get(key: string, defaultValue: string): any {
        return _.get(this.config, key, defaultValue);
    }

    public set(key: string, value: string | number): void {
        _.set(this.config, key, value);
    }
}

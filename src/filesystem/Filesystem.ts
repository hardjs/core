import * as fs from 'fs';
import * as path from 'path';

export class Filesystem {
    public includeFile(filePath: string): null | any {
        const realPath = this.realPath(filePath);
        if (fs.existsSync(realPath)) {
            return require(filePath);
        }

        return null;
    }

    public includeModule(module: string): any {
        // TODO if exist module
        return require(module);
    }

    public realPath(filePath: string): string {
        return this.replaceAll(filePath, '/', path.sep);
    }

    public replaceAll(str: string, search: string, replace: string): string {
        return str.split(search).join(replace);
    }

    public separator(): string {
        return path.sep;
    }
}

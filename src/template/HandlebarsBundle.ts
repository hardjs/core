import { sep } from 'path';
import { Express } from 'express';
import { Bundle } from '../foundation';
import { IContainer } from '../dependency';
import * as handlebars from 'express-handlebars';

export class HandlebarsBundle extends Bundle {
    private kernel;
    private app: Express;

    public folders = {
        templates: 'templates',
    };

    public async boot(container: IContainer) {
        this.app = container.get('app');
        this.kernel = container.get('kernel');
        this.init();
    }

    private init(): void {
        this.app.set('views', this.templateFolder());
        this.app.engine('hbs', handlebars({ defaultLayout: 'base', extname: '.hbs' }));
        this.app.set('view engine', 'hbs');
    }

    private templateFolder(): string {
        return this.kernel.getAppRoot() + sep + '..' + sep + this.folders.templates;
    }
}

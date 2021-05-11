import { sep } from 'path';
import { Express } from 'express';
import { Kernel } from '../foundation';
import * as handlebars from 'express-handlebars';

export class Template {
    public static folders = {
        templates: 'templates',
    };

    private readonly app: Express;

    constructor(express: Express) {
        this.app = express;
    }

    public static create(app: Express): Template {
        return new Template(app);
    }

    public init(): void {
        this.app.set('views', Template.templateFolder());
        this.app.engine(
            'hbs',
            handlebars({ defaultLayout: 'base', extname: '.hbs' }),
        );
        this.app.set('view engine', 'hbs');
    }

    public static templateFolder(): string {
        return Kernel.rootFolder() + sep + Template.folders.templates;
    }
}

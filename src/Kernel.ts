import * as express from 'express';
import { Router } from './routing';
import { Template } from './template';
import { Container } from './dependency';
import { IKernel } from './interfaces';

export abstract class Kernel implements IKernel<Kernel> {
    protected app;
    protected readonly version: string = '1.0.0';

    protected constructor() {
        this.initializeContainer();
        this.initializeKernel();
    }

    abstract initializeKernel(): void;
    abstract loadRoute(): void;

    private initializeContainer(): void {
        Container.set('app', express());
        this.app = Container.get('app');
    }

    public async handle(): Promise<Kernel> {
        this.app.disable('x-powered-by');
        await Router.create().init();
        return this;
    }

    public enableViews(): Kernel {
        Template.create(this.app).init();
        return this;
    }

    public listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server app listening at http://localhost:${port}`);
        });
    }

    public getVersion(): string {
        return this.version;
    }

    public static rootFolder(): string {
        return process.cwd();
    }
}

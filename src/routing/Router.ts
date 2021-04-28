import { Container } from '../dependency';

export class Router {
    private readonly kernel;

    constructor() {
        this.kernel = Container.get('kernel');
    }

    public static create(): Router {
        return new Router();
    }

    public async init(): Promise<void> {
        await this.kernel.loadRoute();
    }
}

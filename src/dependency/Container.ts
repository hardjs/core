import { IContainer } from './interfaces';

export class Container implements IContainer {
    private static instance: Container;
    protected classMap: Map<string, any>;

    private constructor() {
        this.classMap = new Map();
    }

    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }

        return Container.instance;
    }

    public get(id): any {
        return this.classMap.get(id);
    }

    public set(id: string, service): void {
        this.classMap.set(id, service);
    }

    public has(id: string): boolean {
        return this.classMap.has(id);
    }

    public getClassMap(): Map<string, any> {
        return this.classMap;
    }
}

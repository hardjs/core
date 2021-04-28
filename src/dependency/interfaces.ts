export interface IContainer {
    get(id: string): any;
    set(id: string, service: any): void;
    has(id: string): boolean;
    getClassMap(): Map<string, any>;
}

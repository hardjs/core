import { IContainer } from '../dependency';

export abstract class Bundle {
    public abstract boot(container: IContainer): Promise<any>;
}

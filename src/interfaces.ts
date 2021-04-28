export interface IKernel<Kernel> {
    handle(): Promise<Kernel>;
    listen(port: number): void;
}

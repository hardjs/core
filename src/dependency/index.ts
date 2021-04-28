import { Container as ContainerImpl } from './Container';

export { IContainer } from './interfaces';
export const Container = ContainerImpl.getInstance();

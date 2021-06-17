import 'reflect-metadata';
import { createConnections, Connection as BaseConnection } from 'typeorm';

export class Connection {
    public async create(config: []): Promise<BaseConnection[]> {
        try {
            return createConnections(config);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

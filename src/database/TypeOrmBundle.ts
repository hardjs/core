import { Connection } from './Connection';
import { Bundle } from '../foundation';
import { IContainer } from '../dependency';

export class TypeOrmBundle extends Bundle {
    public async boot(container: IContainer) {
        const config = container.get('config');
        const database = config.get('database');

        if (database) {
            const connection = await new Connection().create(database);
            container.set('database.connection', connection);
        }
    }
}

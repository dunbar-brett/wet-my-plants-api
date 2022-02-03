import { ConnectionOptions } from 'typeorm';
import { User } from './src/entity/user';

export const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'wmp-db',
    entities: [User],
    logging: true, 
    synchronize: true,
    cli: {
       entitiesDir: 'src/entity',
       migrationsDir: 'src/migration',
       subscribersDir: 'src/subscriber'
    }
};
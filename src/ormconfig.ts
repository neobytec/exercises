import { ConnectionOptions, DataSource } from 'typeorm'
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [__dirname + '/infrastructure/database/entities/*.ts'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrations: [__dirname + '/infrastructure/database/migrations/**/*.ts'],
}

const datasource = new DataSource(connectionOptions)

export {
    connectionOptions,
    datasource
}
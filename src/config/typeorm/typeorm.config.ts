import { UserEntity } from './../../modules/users/entities/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { includes } from 'lodash';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DEVELOPMENT_TYPE } from './../../enums/development-type.enum';
ConfigModule.forRoot()

const srcDir = join(__dirname, '../..');

const isDevEnv = () => {
    return includes(DEVELOPMENT_TYPE, process.env.NODE_ENV)
}

const migrationsMatcher = `${join(srcDir,'database', 'migrations')}/*migration.{ts,js}`;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions>  => {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [UserEntity],
            migrations: [migrationsMatcher],
            synchronize: false,
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            autoLoadEntities: true,
            logging: true
        }
    }
}

export function typeOrmConfig(): DataSourceOptions {
    const config: MysqlConnectionOptions = {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [UserEntity],
        migrations: [migrationsMatcher],
        extra: {
            charset: 'utf8mb4_unicode_ci',
        },
        logging: true,
    }
    return config;
}
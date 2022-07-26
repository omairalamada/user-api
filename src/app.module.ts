import { roles } from './modules/auth/user-roles';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm/typeorm.config';
import { AccessControlModule } from 'nest-access-control';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig)
  ]
})
export class AppModule {}

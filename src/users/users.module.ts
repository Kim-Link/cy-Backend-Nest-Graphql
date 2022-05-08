import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { usersProviders } from './providers/users.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controller/users.controller';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [DatabaseModule],
  exports: [UsersService],
  providers: [UsersService, ...usersProviders, UsersResolver],
  controllers: [UsersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { ConfigModule } from '@nestjs/config';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'Attale-Pro',
    ),
  ],
  controllers: [UserController],
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}

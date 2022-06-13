import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { RequestTargetStrategy } from 'src/configuration/guards/jwt.strategy';
import { jwtModuleAsyncOptions } from 'src/modules/jwtModuleAsyncOptions';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth.controller';
// import { JwtGraphqlStrategy } from './jwt/jwt-graphql.strategy';
// import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { AuthRepository } from './repository/auth.repository';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'Attale-Pro',
    ),
  ],
  providers: [
    AuthResolver,
    AuthService,
    AuthRepository,
    LocalStrategy,
    RequestTargetStrategy,
    // JwtStrategy,
    // JwtGraphqlStrategy,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}

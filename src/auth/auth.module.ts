import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtModuleAsyncOptions } from 'src/modules/jwtModuleAsyncOptions';
import { UserEntity, UserSchema } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth.controller';
import { JwtGraphqlStrategy } from './jwt/jwt-graphql.strategy';
import { JwtRefreshGraphqlStrategy } from './jwt/jwt-refresh-graphql.strategy';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
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
      [{ name: UserEntity.name, schema: UserSchema }],
      'Attale-Pro',
    ),
  ],
  providers: [
    AuthResolver,
    AuthService,
    AuthRepository,
    LocalStrategy, //* [ REST ] Token Validation
    JwtStrategy, //* [ REST ] Jwt Strategy DI
    JwtRefreshStrategy, //* [ REST ] Jwt Refresh Token Strategy DI
    JwtGraphqlStrategy, //* [ GraphQL ] Jwt Strategy DI
    JwtRefreshGraphqlStrategy, //* [ GraphQL ] Jwt Refresh Token Strategy DI
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtModuleAsyncOptions } from 'src/modules/jwtModuleAsyncOptions';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth.controller';
import { JwtGraphqlStrategy } from './jwt/jwt-graphql.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions),
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtGraphqlStrategy,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtModuleAsyncOptions } from 'src/configuration/modules/jwtModuleAsyncOptions';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth.controller';
import { LocalStrategy } from './jwt/local/local.strategy';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtModuleAsyncOptions),
  ],
  providers: [AuthResolver, AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}

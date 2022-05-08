import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          )}s`,
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    AuthResolver,
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}

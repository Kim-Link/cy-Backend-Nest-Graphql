import { configModuleOptions } from './modules/configModuleOptions';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { mongooseModuleAsyncOptions } from './modules/mongooseModuleOptions';
import { GqlModuleAsyncOption } from './modules/graphQLModuleOptions';
import { RequestTargetGuard } from './configuration/guards/jwt.guard';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { GqlAuthGuard } from './auth/jwt/jwt-auth-graphql.guard';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions), //* Environments 설정,
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions), //* MongoDB 연결
    GraphQLModule.forRootAsync<GqlModuleOptions>(GqlModuleAsyncOption), //* GraphQL 연결
    // 1. 요청 수 제한 모듈
    // 2. Clayful 연결 모듈 & 회원가입, 결재 API용 미들웨어 생성
    AuthModule, //* Auth 설정 (JwtModule, PassportModule, ClayfulModule)
    UserModule,
  ],
  controllers: [],
  providers: [
    // { provide: APP_GUARD, useClass: RequestTargetGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: GqlAuthGuard },
  ],
})
export class AppModule {}

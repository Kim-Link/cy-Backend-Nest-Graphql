import { configModuleOptions } from './modules/configModuleOptions';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { mongooseOptions } from './modules/mongooseModuleOptions';
import { GqlModuleAsyncOption } from './modules/graphQLModuleOptions';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { GqlAuthGuard } from './auth/jwt/jwt-auth-graphql.guard';
import { EightAreaModule } from './eight_area/eight_area.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions), //* Environments 설정,
    MongooseModule.forRootAsync(mongooseOptions('test', 'MONGO_URL')), //* MongoDB 연결
    GraphQLModule.forRootAsync<GqlModuleOptions>(GqlModuleAsyncOption), //* GraphQL 연결
    AuthModule, //* Auth (JwtModule, PassportModule, ClayfulModule)
    // Clayful 연결 모듈 & 회원가입, 결재 API용 미들웨어 생성
    UserModule,
    EightAreaModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: GqlAuthGuard },
    // { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleOptions } from './configuration/modules/configModuleOptions';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModuleAsyncOptions } from './configuration/modules/mongooseModuleOptions';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { GqlModuleAsyncOption } from './configuration/modules/graphQLModuleOptions';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions), //* Environments 설정,
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions), //* MongoDB 연결
    GraphQLModule.forRootAsync<GqlModuleOptions>(GqlModuleAsyncOption), //* GraphQL 연결
    //1.  요청 수 제한 모듈
    //2.  AuthModule, //* Auth 모듈
    // ----> 2-1. PassportModule 생성
    // ----> 2-2. JwtModule 생성
    //3. Clayful 연결 모듈 & 회원가입, 결재 API용 미들웨어 생성
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

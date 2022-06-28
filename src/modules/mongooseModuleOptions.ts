import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseOptions = (
  connectionName: string,
  mongodb_url: string,
): MongooseModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  connectionName: connectionName,
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>(mongodb_url),
    retryAttempts: 2, //? 재시도 횟수
    retryDelay: 1000, //? 접속 재시도 간격
  }),
});

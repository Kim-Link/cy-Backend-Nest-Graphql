import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseModuleAsyncOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  connectionName: 'Attale-Pro',
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URL'),
    retryAttempts: 2, //? 재시도 횟수
    retryDelay: 1000, //? 접속 재시도 간격
  }),
};

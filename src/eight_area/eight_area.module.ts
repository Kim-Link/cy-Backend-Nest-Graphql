import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EightAreaController } from './controller/eight_area.controller';
import { EightAreaEntity, EightAreaSchema } from './entities/eight_area.entity';
import { EightAreaResolver } from './resolver/eight_area.resolver';
import { EightAreaService } from './service/eight_area.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature(
      [{ name: EightAreaEntity.name, schema: EightAreaSchema }],
      'Attale-Pro',
    ),
  ],
  controllers: [EightAreaController],
  providers: [EightAreaService, EightAreaResolver],
  exports: [],
})
export class EightAreaModule {}

import { Module } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { CatsService } from './services/cats.service';
import { catsProviders } from './providers/cats.providers';
import { DatabaseModule } from '../database/database.module';
import { CatsResolver } from './resolvers/cats.resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, CatsResolver, ...catsProviders],
})
export class CatsModule {}

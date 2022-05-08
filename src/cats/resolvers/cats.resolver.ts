import { Query, Resolver } from '@nestjs/graphql';
import { CatsService } from '../services/cats.service';
import { Injectable } from '@nestjs/common';
import { Public } from '../../skip-auth.decorator';
import { Cat } from '../entities/cat.entity';

/**
 * CatsResolver
 */
@Injectable()
@Resolver()
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Public()
  @Query(() => [Cat], { nullable: true })
  findAllCats() {
    return this.catsService.findAll();
  }
}

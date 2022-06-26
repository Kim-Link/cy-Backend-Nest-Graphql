import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EightAreaService } from '../service/eight_area.service';

@Resolver()
export class EightAreaResolver {
  constructor(private readonly eightAreaService: EightAreaService) {}
}

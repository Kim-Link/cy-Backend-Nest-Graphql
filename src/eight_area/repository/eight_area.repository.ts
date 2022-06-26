import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EightAreaDocument,
  EightAreaEntity,
} from '../entities/eight_area.entity';

@Injectable()
export class EightAreaRepository {
  constructor(
    @InjectModel(EightAreaEntity.name, 'Attale-Pro')
    private readonly eightAreaModel: Model<EightAreaDocument>,
  ) {}
}

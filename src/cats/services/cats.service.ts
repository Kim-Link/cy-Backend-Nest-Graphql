import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import { Cat } from '../entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @Inject(Cat.name)
    private catModel: Model<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}

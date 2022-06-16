import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity, UserDocument } from '../entities/user.entity';
import { User } from '../interfaces/interface/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name, 'Attale-Pro')
    private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userModel.find().exec();
  }

  async findOne(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userModel.findById(id);
  }
}

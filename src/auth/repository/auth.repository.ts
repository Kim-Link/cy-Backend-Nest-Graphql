import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name, 'Attale-Pro')
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User) {
    return await this.userModel.create(user);
  }
}

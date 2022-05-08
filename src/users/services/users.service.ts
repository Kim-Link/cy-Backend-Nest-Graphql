import { Model } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { compare, hash } from 'bcrypt';
import { UserType } from '../interfaces/user.type';
@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = this.userModel.findOne({ email: email }).exec();
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(_id: string) {
    const user = await this.userModel.findOne({ _id });
    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async setCurrentRefreshToken(refreshToken: string, _id: string) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);

    // deprecated
    await this.userModel.updateOne({ _id }, { currentHashedRefreshToken });
    // await this.userModel.update(userId, { currentHashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, _id: string) {
    const user = await this.getById(_id);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(_id: string) {
    return this.userModel.updateOne(
      { _id },
      {
        currentHashedRefreshToken: null,
      },
    );
  }
}

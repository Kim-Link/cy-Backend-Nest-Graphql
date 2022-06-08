import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.dto';
import { UpdateUserInput } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(CreateUserInputDTO) {
    return '';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

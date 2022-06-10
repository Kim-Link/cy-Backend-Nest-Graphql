import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(CreateUserDTO: CreateUserDto) {
    return '';
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async getById(id: number) {
    return await this.userRepository.findById(id);
  }

  async findOne(email: string) {
    return await this.userRepository.findOne(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
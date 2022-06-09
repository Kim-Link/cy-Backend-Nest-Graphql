import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dto';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    console.log(user);
    return await this.userService.findOne(user.email);
  }
}

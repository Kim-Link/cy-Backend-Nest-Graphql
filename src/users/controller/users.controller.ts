import {
  Body,
  Controller,
  // Delete,
  Get,
  Query,
  // Param,
  // Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Public } from '../../skip-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/findone')
  findOne(@Query('email') email: string) {
    return this.usersService.findOne(email);
  }
}

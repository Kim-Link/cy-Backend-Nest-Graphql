import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { UserType } from '../interfaces/user.type';
import { Injectable } from '@nestjs/common';
import { Public } from '../../skip-auth.decorator';

/**
 * CatsResolver
 */
@Injectable()
@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Public()
  @Query(() => [UserType], { nullable: true })
  findAllUsers() {
    return this.usersService.findAll();
  }
}

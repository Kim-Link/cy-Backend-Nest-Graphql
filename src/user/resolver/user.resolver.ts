import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from '../dto/create-user.dto';
import { UpdateUserInput } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => User)
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query((returns) => [User])
  async findAll() {
    return this.userService.findAll();
  }

  @Query((returns) => User)
  async findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation((returns) => User)
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return {};
  }

  @Mutation((returns) => User)
  async remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}

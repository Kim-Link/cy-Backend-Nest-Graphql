import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto';
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => User)
  async create(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Query((returns) => [User])
  async findAll() {
    return this.userService.findAll();
  }

  @Query((returns) => User)
  async findOne(@Args('email') email: string) {
    return this.userService.findOne(email);
  }

  @Mutation((returns) => User)
  async update(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return {};
  }

  @Mutation((returns) => User)
  async remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}

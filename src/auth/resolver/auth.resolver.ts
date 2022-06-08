import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => User)
  create(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.create(createAuthInput);
  }

  @Query((returns) => [User])
  findAll() {
    return this.authService.findAll();
  }

  @Query((returns) => User)
  findOne(@Args('id') id: number) {
    return this.authService.findOne(id);
  }

  @Mutation((returns) => User)
  update(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation((returns) => User)
  remove(@Args('id') id: number) {
    return this.authService.remove(id);
  }
}

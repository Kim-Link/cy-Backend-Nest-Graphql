import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Public } from 'src/configuration/decorators/skip-auth.decorator';
import { CreateUserDto } from 'src/user/dto';
import { UserType } from 'src/user/interfaces/type/user.type';
import { AuthService } from '../service/auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation((returns) => UserType)
  async register(@Args('createUserDto') user: CreateUserDto): Promise<any> {
    return this.authService.register(user);
  }
}

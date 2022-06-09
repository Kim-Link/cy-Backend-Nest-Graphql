import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from '../service/auth.service';
import { CreateUserDto, UpdateUserDto } from '../../user/dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
}

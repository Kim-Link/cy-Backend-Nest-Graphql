import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainTextPassword: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) return new BadRequestException('Wrong credentials provided');

    return user;
  }

  async register(user: any) {
    const newUser = await this.authRepository.createUser(user);
    return newUser;
  }

  async login(user: any) {
    console.log(user);
    return {
      access_token: this.jwtService.sign({ id: user._id }),
    };
  }
}

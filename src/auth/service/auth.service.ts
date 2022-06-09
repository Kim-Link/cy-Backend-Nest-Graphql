import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, plainTextPassword: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) return new BadRequestException('Wrong credentials provided');

    return user;
  }
}

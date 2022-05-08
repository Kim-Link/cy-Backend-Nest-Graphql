import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Injectable,
  Logger,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { Public } from '../../skip-auth.decorator';
import { UserType } from '../../users/interfaces/user.type';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { TokenType } from '../interfaces/token.type';
import { JwtRefreshGuard } from '../jwt/jwt-refresh.guard';

@Injectable()
@Resolver('Auth')
export class AuthResolver {
  private logger: Logger;
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    this.logger = new Logger('AuthResolver');
  }

  @Public()
  @Mutation(() => TokenType)
  async login(@Args('data') userData: LoginUserDto) {
    const user = (
      await this.authService.validateUser(userData.email, userData.password)
    )._doc;
    if (!user) {
      throw new UnauthorizedException();
    }

    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(user._id.toString());

    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(user._id.toString());

    await this.usersService.setCurrentRefreshToken(
      refreshToken,
      user._id.toString(),
    );

    return {
      accessToken: accessToken,
      accessOption: JSON.stringify(accessOption),
      refreshToken: refreshToken,
      refreshOption: JSON.stringify(refreshOption),
    };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Mutation(() => TokenType)
  async logOut(@Args('data') userData: LoginUserDto) {
    const user = (
      await this.authService.validateUser(userData.email, userData.password)
    )._doc;
    await this.usersService.removeRefreshToken(user._id.toString());
    return {
      accessToken: '',
      accessOption: '',
      refreshToken: '',
      refreshOption: '',
    };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Query(() => TokenType)
  async refresh(@Args('data') userData: LoginUserDto) {
    const user = (
      await this.authService.validateUser(userData.email, userData.password)
    )._doc;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(user._id.toString());

    return {
      accessToken: accessToken,
      accessOption: accessOption,
    };
  }

  @Public()
  @Mutation(() => UserType, {
    name: 'register',
    description:
      '\
    \n\n### 새로운 유저를 생성합니다. \
    \n\n - 샘플: [@Design](https://www.notion.so/CreateNewUser-5348b17076dc467abf941409f7354f71) \
  ',
  })
  async register(@Args('createUserDto') user: CreateUserDto): Promise<any> {
    return this.authService.register(user);
  }
}

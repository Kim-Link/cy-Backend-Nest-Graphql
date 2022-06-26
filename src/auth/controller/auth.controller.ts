import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/configuration/decorators/skip-auth.decorator';
import { FastifyReply } from 'fastify';
import { LocalAuthGuard } from '../local/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from 'src/user/dto';
import { IUser } from '../../user/interfaces/interface/user.interface';
import { JwtRefreshGuard } from '../jwt/jwt-refresh.guard';
import { UserService } from 'src/user/service/user.service';
import { TokenType } from '../dto/token.type';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<any> {
    return await this.authService.register(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<TokenType> {
    const user: IUser = req.user as IUser;

    const { accessToken, accessOption, refreshToken, refreshOption } =
      await this.authService.login(user);

    await this.userService.setCurrentRefreshToken(
      refreshToken,
      user._id.toString(),
    );

    res.setCookie('Authentication', accessToken, accessOption);
    res.setCookie('Refresh', refreshToken, refreshOption);

    return {
      accessToken: accessToken,
      accessOption: accessOption,
      refreshToken: refreshToken,
      refreshOption: refreshOption,
    };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res: FastifyReply) {
    const user: IUser = req.user as IUser;

    const { token: accessToken, ...accessOption } =
      await this.authService.getToken(
        { id: user._id.toString() },
        'ACCESS_TOKEN',
      );

    res.setCookie('Authentication', accessToken, accessOption);

    return {
      accessToken: accessToken,
      accessOption: accessOption,
    };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logOut(@Req() req, @Res({ passthrough: true }) res: FastifyReply) {
    const user: IUser = req.user as IUser;
    const subject = 'LOGOUT';

    const cookieOptions = await this.authService.genCookieOption({ subject });

    await this.userService.setCurrentRefreshToken(null, user._id.toString());

    res.setCookie('Authentication', '', cookieOptions);
    res.setCookie('Refresh', '', cookieOptions);

    return;
  }
}

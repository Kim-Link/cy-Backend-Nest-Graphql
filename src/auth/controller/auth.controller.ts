import {
  Controller,
  Post,
  UseGuards,
  Res,
  Req,
  Body,
  Get,
  Logger,
} from '@nestjs/common';
import { LocalAuthGuard } from '../local/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { Public } from '../../skip-auth.decorator';
import { FastifyReply } from 'fastify';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/interfaces/user.interface';
import { UsersService } from '../../users/services/users.service';
import { JwtRefreshGuard } from '../jwt/jwt-refresh.guard';
import { ApiBadRequestResponse, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: 'Login',
    description: 'Login with email and password',
  })
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: FastifyReply) {
    const user: User = req.user._doc as User;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(user._id.toString());

    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(user._id.toString());

    await this.usersService.setCurrentRefreshToken(
      refreshToken,
      user._id.toString(),
    );

    res.setCookie('Authentication', accessToken, accessOption);
    res.setCookie('Refresh', refreshToken, refreshOption);

    return {
      accessToken: accessToken,
      accessOption: JSON.stringify(accessOption),
      refreshToken: refreshToken,
      refreshOption: JSON.stringify(refreshOption),
    };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logOut(@Req() req, @Res({ passthrough: true }) res: FastifyReply) {
    const user: User = req.user._doc as User;
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut();

    await this.usersService.removeRefreshToken(user._id.toString());
    res.setCookie('Authentication', '', accessOption);
    res.setCookie('Refresh', '', refreshOption);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: FastifyReply) {
    const user: User = req.user._doc as User;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(user._id.toString());
    res.setCookie('Authentication', accessToken, accessOption);
    return user;
  }

  @Public()
  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiBadRequestResponse()
  async register(@Body() user: CreateUserDto): Promise<any> {
    this.logger.debug(`Registering user: ${JSON.stringify(user)}`);
    return this.authService.register(user);
  }
}

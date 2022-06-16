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
import { ApiBadRequestResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../../user/interfaces/interface/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async findAll(@Req() req, @Res() res: FastifyReply) {
    return {
      message: 'Success',
    };
  }

  @Public()
  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiBadRequestResponse()
  async register(@Body() user: CreateUserDto): Promise<any> {
    return await this.authService.register(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({
    summary: 'Login',
    description: 'Login with email and password',
  })
  async login(@Req() req, @Res({ passthrough: true }) res: FastifyReply) {
    const { accessToken, accessOption, refreshToken, refreshOption } =
      await this.authService.login(req.user as User);

    res.setCookie('Authentication', accessToken, accessOption);
    res.setCookie('Refresh', refreshToken, refreshOption);

    return {
      accessToken,
      accessOption,
      refreshToken,
      refreshOption,
    };
  }
}

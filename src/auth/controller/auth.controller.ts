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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async findAll(@Req() req, @Res() res: FastifyReply) {
    console.log('findAll req :', req.user);
    return {
      message: 'Success',
    };
  }

  @Public()
  @Post('register')
  async register(@Body() user) {
    console.log(user);
    return await this.authService.register(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: FastifyReply) {
    return await this.authService.login(req.user);
  }
}

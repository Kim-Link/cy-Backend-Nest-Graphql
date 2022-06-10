import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/configuration/decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  @Get()
  async findAll(): Promise<any> {
    return {
      message: 'Success',
    };
  }
}

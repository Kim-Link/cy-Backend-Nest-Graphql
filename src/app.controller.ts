import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './skip-auth.decorator';

/**
 * AppController
 *
 * 샘플용 컨트롤러
 */
@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Public()
  @Get()
  home(): string {
    return this.appService.getHello();
  }
}

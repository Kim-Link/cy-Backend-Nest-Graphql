import { Injectable } from '@nestjs/common';

/**
 * # AppService
 */
@Injectable()
export class AppService {
  /**
   * ## 단순 테스트용 기능.
   * - param: 없음.
   * - return "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }
}

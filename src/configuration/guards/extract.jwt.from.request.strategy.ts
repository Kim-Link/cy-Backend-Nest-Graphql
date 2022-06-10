import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RequestTargetStrategy extends PassportStrategy(
  Strategy,
  'request',
) {
  constructor(
    // private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super();
    //   {
    //   jwtFromRequest: ExtractJwt.fromExtractors([
    //     (request) => {
    //       console.log(request?.cookies?.Authentication);
    //       return request?.cookies?.Authentication;
    //     },
    //   ]),
    //   secretOrKey: 'JWT_ACCESS_TOKEN_SECRET',
    // }
  }

  async validate(payload: any) {
    console.log('====== Strategy function validate =======');
    console.log('payload :', payload);
    // return this.usersService.getById(payload.id);
  }
}

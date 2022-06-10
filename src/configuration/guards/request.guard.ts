import { ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/skip-auth.decorator';

//! 가드 실행 -> 전략 validate 함수 실행 -> 리턴값이 가드의 handleRequest의 user로 전달 ->
@Injectable()
export class RequestTargetGuard extends AuthGuard('request') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    if (context.getType<GqlContextType>() === 'graphql')
      return GqlExecutionContext.create(context).getContext().req;
    else if (context.getType<ContextType>() === 'http')
      return context.switchToHttp().getRequest();
  }

  canActivate(context: ExecutionContext) {
    console.log('context Type :', context.getType());
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}

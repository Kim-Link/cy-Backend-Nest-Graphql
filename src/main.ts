import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import globalMiddleware from './configuration/middlewares';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await globalMiddleware(app);

  await app.listen(
    app.get(ConfigService).get<number>('PORT'),
    app.get(ConfigService).get<string>('HOST'),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

//! https://docs.nestjs.com/faq/request-lifecycle#request-lifecycle
// 1. Incoming request
// 2. Globally bound middleware
// 3. Module bound middleware
// 4. Global guards
//    4-1. define request type rest or graphql
// 5. Controller and Resolver guards
//    5-1. refresh guards
// 6. Route guards
// 7. Global interceptors (pre-controller)
// 8. Controller interceptors (pre-controller)
// 9. Route interceptors (pre-controller)
// 10. Global pipes
// 11. Controller pipes
// 12. Route pipes
// 13. Route parameter pipes
// 14, Controller (method handler)
// 15. Service (if exists)
// 16. Route interceptor (post-request)
// 17. Controller interceptor (post-request)
// 18. Global interceptor (post-request)
// 19. Exception filters (route, then controller, then global)
// 20. Server response

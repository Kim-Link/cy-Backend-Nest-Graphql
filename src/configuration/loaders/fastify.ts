import { fastifyHelmet } from 'fastify-helmet';
import fastifyCsrf from 'fastify-csrf';
import fastifyCookie from 'fastify-cookie';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '../middlewares/error/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

export const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  maxAge: 3600 * 5,
  credentials: true,
};

export const fastifyMiddleware = async (app: NestFastifyApplication) => {
  //? fastify Middleware //
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
        ],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
      },
    },
  });
  // await app.register(fastifyCsrf);
  await app.register(fastifyCookie, {
    secret: app.get(ConfigService).get<string>('COOKIE_SECRET'),
  });

  // //? Logging Middleware //
  // process.env.NODE_ENV !== 'testing' && app.use(LoggerMiddleware);

  //?  //
  app.getHttpAdapter();

  //? Server Prefix Setting //
  app.setGlobalPrefix(app.get(ConfigService).get<string>('PRE_FIX') || '');

  //? Schema Validation Pipe //
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //? catch(error) Error Handling //
  app.useGlobalFilters(new HttpExceptionFilter());

  //? Interceptors //
  // app.useGlobalInterceptors(new )

  // //? Cors Setting //
  // app.enableCors(corsOptions);
};

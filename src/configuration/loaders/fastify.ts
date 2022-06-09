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
  //? Nest fastify Middleware //
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

  //? Logging Middleware //
  // process.env.NODE_ENV !== 'testing' && app.use(LoggerMiddleware);

  // //  ? //
  // app.getHttpAdapter();

  //? Server Prefix Setting //
  app.setGlobalPrefix(app.get(ConfigService).get<string>('PRE_FIX') || '');

  //? Global Interceptors //
  // app.useGlobalInterceptors(new ) //*

  //? Global Validation Pipe //
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //*
      whitelist: true, //* DTO에 없는 Request Body 속성 제거
      forbidNonWhitelisted: true, //*
    }),
  );

  //? Global Error Handling //
  app.useGlobalFilters(new HttpExceptionFilter()); //* Catch()로 전달된 Error 객체 핸들링 모듈

  // //? Cors Setting //
  // app.enableCors(corsOptions);
};

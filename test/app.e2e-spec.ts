import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from 'fastify-cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigModule } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.register(fastifyCookie, {
      secret: 'my-secret', // for cookies signature
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    const config = new DocumentBuilder()
      .setTitle('어테일 프로 서비스')
      .setDescription('어테일 프로 API 서비스')
      .setVersion('1.0')
      // .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET `, () => {
    return app
      .inject({
        method: 'GET',
        url: '/',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.payload).toEqual('Hello World!');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from 'fastify-cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';

describe('GNKO-53', () => {
  let app: NestFastifyApplication;
  const db = mongoose.connection;

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

    // await browser.executeScript('window.localStorage.clear();');

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`4`, async () => {
    const loginInfo = await app.inject({
      method: 'POST',
      url: '/auth/login',
      headers: { 'content-type': 'application/json' },
      payload: {
        email: 'user@user.com',
        password: '1234',
      },
    });

    const findOneInfo = await app
      .inject()
      .get('/users/findone')
      .cookies({
        Authentication: loginInfo.cookies[0]['value'],
        Refresh: loginInfo.cookies[1]['value'],
      })
      .query({
        email: 'user@user.com',
      })
      .end();
    const payload = JSON.parse(findOneInfo.payload);
    expect(findOneInfo.statusCode).toEqual(200);
    expect(payload.id).toBeDefined();

    return app;
  });

  it(`5`, async () => {
    const loginInfo = await app.inject({
      method: 'POST',
      url: '/auth/login',
      headers: { 'content-type': 'application/json' },
      payload: {
        email: 'user@user.com',
        password: '1234',
      },
    });
    const refreshInfo = await app
      .inject()
      .get('/auth/refresh')
      .cookies({
        Authentication: loginInfo.cookies[0]['value'],
        Refresh: loginInfo.cookies[1]['value'],
      })
      .end();

    const payloadRefresh = JSON.parse(refreshInfo.payload);
    expect(refreshInfo.statusCode).toEqual(200);
    expect(payloadRefresh._id).toBeDefined();
    expect(refreshInfo.cookies[0]['name']).toEqual('Authentication');
    expect(refreshInfo.cookies[0]['value'].length).toBeGreaterThan(0);

    const findOneInfo = await app
      .inject()
      .get('/users/findone')
      .cookies({
        Authentication: refreshInfo.cookies[0]['value'],
        Refresh: loginInfo.cookies[1]['value'],
      })
      .query({
        email: 'user@user.com',
      })
      .end();
    const payload = JSON.parse(findOneInfo.payload);
    expect(findOneInfo.statusCode).toEqual(200);
    expect(payload.id).toBeDefined();

    return app;
  });

  it(`10`, async () => {
    const loginInfo = await app.inject({
      method: 'POST',
      url: '/auth/login',
      headers: { 'content-type': 'application/json' },
      payload: {
        email: 'user@user.com',
        password: '1234',
      },
    });

    const logoutInfo = await app
      .inject()
      .post('/auth/logout')
      .cookies({
        Authentication: loginInfo.cookies[0]['value'],
        Refresh: loginInfo.cookies[1]['value'],
      })
      .end();

    const findOneInfo = await app
      .inject()
      .get('/users/findone')
      .cookies({
        Authentication: logoutInfo.cookies[0]['value'],
        Refresh: logoutInfo.cookies[1]['value'],
      })
      .query({
        email: 'user@user.com',
      })
      .end();
    expect(findOneInfo.statusCode).toEqual(401);
    expect(findOneInfo.statusMessage).toEqual('Unauthorized');

    return app;
  });

  it(`12`, async () => {
    const findOneInfo = await app
      .inject()
      .get('/users/findone')
      .query({
        email: 'user@user.com',
      })
      .end();
    expect(findOneInfo.statusCode).toEqual(401);
    expect(findOneInfo.statusMessage).toEqual('Unauthorized');

    return app;
  });

  afterAll(async () => {
    await app.close();
  });
});

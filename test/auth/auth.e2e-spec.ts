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

describe('AuthController (e2e)', () => {
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

  /**
   * 유저가 존재하지 않을때
   */
  it(`유저등록(유저 존재하지 않음) (POST)`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/register',
        headers: { 'content-type': 'application/json' },
        payload: {
          email: 'user@user.com',
          name: '김',
          birth: '1999-01-01',
          password: '1234',
          sex: 'MALE',
          role: 'USER',
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });

  it(`로그인(유저 존재하지 않음) (POST)`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        headers: { 'content-type': 'application/json' },
        payload: {
          email: 'user1234@user.com',
          password: '1234',
        },
      })
      .then((result) => {
        const payload = JSON.parse(result.payload);
        expect(result.statusCode).toEqual(400);
        expect(payload.message).toEqual('Wrong credentials provided');
      });
  });

  // /**
  //  * 유저가 존재할때
  //  */
  it(`유저등록(유저 존재함) (POST)`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/register',
        headers: { 'content-type': 'application/json' },
        payload: {
          email: 'user@user.com',
          name: '김',
          birth: '1999-01-01',
          password: '1234',
          sex: 'MALE',
          role: 'USER',
        },
      })
      .then((result) => {
        const payload = JSON.parse(result.payload);
        expect(result.statusCode).toEqual(400);
        expect(payload.message).toEqual('User with that email already exists');
      });
  });

  it(`로그인(유저 존재함) (POST)`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        headers: { 'content-type': 'application/json' },
        payload: {
          email: 'user@user.com',
          password: '1234',
        },
      })
      .then((result) => {
        const payload = JSON.parse(result.payload);
        expect(result.statusCode).toEqual(201);
        expect(payload._id).toBeDefined();
        expect(payload.password).not.toEqual('1234');
      });
  });

  // /**
  //  * 로그인 안했을때
  //  */
  it(`유저 access token 재발급(로그인안함) (POST)`, () => {
    return app
      .inject({
        method: 'GET',
        url: '/auth/refresh',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
        expect(result.statusMessage).toEqual('Unauthorized');
      });
  });

  it(`유저 로그아웃(로그인안함) (POST)`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/logout',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
        expect(result.statusMessage).toEqual('Unauthorized');
      });
  });

  /**
   * 로그인 했을때
   */
  it(`유저 access token 재발급(로그인함) (GET)`, async () => {
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

    const payload = JSON.parse(refreshInfo.payload);
    expect(refreshInfo.statusCode).toEqual(200);
    expect(payload._id).toBeDefined();
    expect(refreshInfo.cookies[0]['name']).toEqual('Authentication');
    expect(refreshInfo.cookies[0]['value'].length).toBeGreaterThan(0);
    return app;
  });

  it(`유저 로그아웃(로그인함) (POST)`, async () => {
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
    expect(logoutInfo.statusCode).toEqual(201);
    expect(logoutInfo.cookies[0]['name']).toEqual('Authentication');
    expect(logoutInfo.cookies[0]['value'].length).toEqual(0);
    expect(logoutInfo.cookies[1]['name']).toEqual('Refresh');
    expect(logoutInfo.cookies[1]['value'].length).toEqual(0);

    return app;
  });

  afterAll(async () => {
    // db.once('open', function () {
    //   console.log('db connect');
    //   db.dropCollection('users', (err) => {
    //     if (err) {
    //       console.log('error delete collection');
    //     } else {
    //       console.log('delete collection success');
    //     }
    //   });
    // });
    await app.close();
  });
});

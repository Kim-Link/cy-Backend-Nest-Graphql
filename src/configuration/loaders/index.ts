import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyMiddleware } from './fastify';
import { swaggerMiddleware } from './swagger';
// import { webSocketLoader } from './web.socket';

export default async (app: NestFastifyApplication) => {
  await fastifyMiddleware(app);

  await swaggerMiddleware(app);

  // await webSocketLoader(app);
};

// `@nestjs/common/interfaces` is no longer a resolvable subpath under the
// NestJS 12 exports map; `ModuleMetadata` is re-exported from the package root
// on both 11 and 12.
import {
  Controller,
  Get,
  Module,
  type ModuleMetadata,
  type Type,
} from '@nestjs/common';
import { type AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import request from 'supertest';

import { fastifyExtraWait } from './fastify-extra-wait';

export async function requestAppWith(
  modules: ModuleMetadata['imports'],
  Adapter: Type<AbstractHttpAdapter<unknown, unknown, unknown>>,
  getOrder: () => string,
) {
  @Controller('/')
  class TestController {
    @Get()
    get() {
      return { order: getOrder() };
    }
  }

  @Module({
    imports: modules,
    controllers: [TestController],
  })
  class TestModule {}

  const app = await NestFactory.create(TestModule, new Adapter(), {
    logger: false,
  });

  const server = app.getHttpServer();
  await app.init();
  await fastifyExtraWait(Adapter, app);
  const { body }: { body: { order: string } } = await request(server).get('/');
  await app.close();
  return body;
}

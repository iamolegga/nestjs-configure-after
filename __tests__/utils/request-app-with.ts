import { Controller, Get, Module, Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import * as request from 'supertest';
import { fastifyExtraWait } from './fastify-extra-wait';

export async function requestAppWith(
  modules: ModuleMetadata['imports'],
  Adapter: Type<AbstractHttpAdapter<any, any, any>>,
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

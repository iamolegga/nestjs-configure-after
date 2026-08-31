import type { Type } from '@nestjs/common';
import type { AbstractHttpAdapter } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';

export type Adapter = Type<AbstractHttpAdapter<any, any, any>>;

export const platforms: Adapter[] = [ExpressAdapter, FastifyAdapter];

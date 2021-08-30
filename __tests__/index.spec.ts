import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { After } from '../src';
import { permute } from './utils/permute';
import { platforms } from './utils/platforms';
import { requestAppWith } from './utils/request-app-with';

let order = '';

@Module({})
@After()
class ModuleA {}

@Module({})
@After(ModuleA)
class ModuleB implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((_req: any, _res: any, next: () => void) => {
        order += 'B';
        next();
      })
      .forRoutes('*');
  }
}

@Module({})
@After(ModuleA, ModuleB)
class ModuleC implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((_req: any, _res: any, next: () => void) => {
        order += 'C';
        next();
      })
      .forRoutes('*');
  }
}

const combinations = permute([ModuleA, ModuleB, ModuleC]);

describe('should work', () => {
  for (const adapter of platforms) {
    describe(adapter.name, () => {
      let i = 0;
      for (const combination of combinations) {
        it(`combination ${++i}`, async function () {
          order = '';
          const result = await requestAppWith(
            combination,
            adapter,
            () => order,
          );
          expect(result.order).toBe('BC');
        });
      }
    });
  }
});

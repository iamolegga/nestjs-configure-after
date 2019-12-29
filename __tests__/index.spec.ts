import { MiddlewareConsumer, Module } from '@nestjs/common';
import { After } from '../src';
import { permute } from './utils/permute';
import { platforms } from './utils/platforms';
import { requestAppWith } from './utils/request-app-with';

let order = '';

@Module({})
@After()
class ModuleA {}

// tslint:disable-next-line: max-classes-per-file
@Module({})
@After(ModuleA)
class ModuleB {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((_req: any, _res: any, next: () => void) => {
        order += 'B';
        next();
      })
      .forRoutes('*');
  }
}

// tslint:disable-next-line: max-classes-per-file
@Module({})
@After(ModuleA, ModuleB)
class ModuleC {
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

for (const adapter of platforms) {
  describe(adapter.name, () => {
    it('should work in any order', async () => {
      for (const combination of combinations) {
        order = '';
        const result = await requestAppWith(combination, adapter, () => order);
        expect(result.order).toBe('BC');
      }
    });
  });
}

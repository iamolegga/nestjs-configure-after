import { EventEmitter } from 'node:events';
import type { MiddlewareConsumer, NestModule, Type } from '@nestjs/common';

const e = new EventEmitter();

type Configured = Type<Partial<NestModule>>;

/**
 * Class decorator for Module, that will call `configure` method after
 * configuring passed modules
 * @param depModules modules, that should be configured before target module
 */
export function After(...depModules: Array<Type<unknown>>) {
  return <T extends Configured>(target: T) => {
    const decorated = class extends target {
      // `NestModule` declares `configure` as a property, so redeclaring it as a
      // method on the subclass is a TS2425 error - which is exactly what this
      // decorator has to do.
      // @ts-expect-error TS2425
      async configure(consumer: MiddlewareConsumer) {
        if (depModules.length)
          await Promise.all(
            depModules.map((m) => new Promise((r) => e.once(m.name, r))),
          );
        if (super.configure) await super.configure(consumer);
        else await Promise.resolve();
        e.emit(target.name);
      }
    };
    // https://github.com/microsoft/TypeScript/issues/37157
    Object.defineProperty(decorated, 'name', { value: target.name });
    return decorated;
  };
}

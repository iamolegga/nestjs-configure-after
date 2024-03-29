import { EventEmitter } from 'events';

import { MiddlewareConsumer, NestModule, Type } from '@nestjs/common';

const e = new EventEmitter();

type Configured = Type<Partial<NestModule>>;

/**
 * Class decorator for Module, that will call `configure` method after
 * configuring passed modules
 * @param depModules modules, that should be configured before target module
 */
export function After(...depModules: Array<Type<unknown>>) {
  return <T extends Configured>(constructor: T) => {
    const decorated = class extends constructor {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      async configure(consumer: MiddlewareConsumer) {
        if (depModules.length)
          await Promise.all(
            depModules.map((m) => new Promise((r) => e.once(m.name, r))),
          );
        if (super.configure) await super.configure(consumer);
        else await Promise.resolve();
        e.emit(constructor.name);
      }
    };
    // https://github.com/microsoft/TypeScript/issues/37157
    Object.defineProperty(decorated, 'name', { value: constructor.name });
    return decorated;
  };
}

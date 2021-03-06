import { MiddlewareConsumer, Type } from '@nestjs/common';
import { EventEmitter } from 'events';

const e = new EventEmitter();

interface Configured {
  configure?(consumer: MiddlewareConsumer): void | Promise<void>;
  [key: string]: any;
}

/**
 * Class decorator for Module, that will call `configure` method after
 * configuring passed modules
 * @param depModules modules, that should be configured before target module
 */
export function After(...depModules: Array<Type<{}>>) {
  return <T extends Type<Configured>>(constructor: T) => {
    return class extends constructor {
      async configure(consumer: MiddlewareConsumer) {
        if (depModules.length) {
          await Promise.all(
            depModules.map(m => new Promise(r => e.once(m.name, r))),
          );
        }
        if (super.configure) {
          await super.configure(consumer);
        } else {
          await Promise.resolve();
        }
        e.emit(constructor.name);
      }
    };
  };
}

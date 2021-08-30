<h1 align="center">nestjs-configure-after</h1>


<p align="center">
  <a href="https://www.npmjs.com/package/nestjs-configure-after">
    <img alt="npm" src="https://img.shields.io/npm/v/nestjs-configure-after" />
  </a>
  <img alt="GitHub branch checks state" src="https://badgen.net/github/checks/iamolegga/nestjs-configure-after" />
  <a href="https://codeclimate.com/github/iamolegga/nestjs-configure-after/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/c60f33b6ad5f9e96d358/test_coverage" />
  </a>
  <img alt="Supported platforms: Express & Fastify" src="https://img.shields.io/badge/platforms-Express%20%26%20Fastify-green" />
</p>
<p align="center">
  <a href="https://snyk.io/test/github/iamolegga/nestjs-configure-after">
    <img alt="Snyk Vulnerabilities for npm package" src="https://img.shields.io/snyk/vulnerabilities/npm/nestjs-configure-after" />
  </a>
  <a href="https://david-dm.org/iamolegga/nestjs-configure-after">
    <img alt="Dependencies status" src="https://badgen.net/david/dep/iamolegga/nestjs-configure-after">
  </a>
  <img alt="Dependabot" src="https://badgen.net/dependabot/iamolegga/nestjs-configure-after/?icon=dependabot">
  <a href="https://codeclimate.com/github/iamolegga/nestjs-configure-after">
    <img alt="Maintainability" src="https://badgen.net/codeclimate/maintainability/iamolegga/nestjs-configure-after">
  </a>
</p>

Using NestJS?

Have middlewares that are set in `configure(consuer: MiddlewareConsumer) {}` of it's module?

Do you want to control the order of execution of these middlewares?

## Install

```sh
npm i nestjs-configure-after
```

## Example

Let's assume we have ModuleA, ModuleB and ModuleC, and each has own middleares setup. And we want these middleware to be set in the right order, like A -> B -> C. By default NestJS does not provide the way to set the order. But with this module it's you can:

```ts
import { After } from 'nestjs-configure-after'

@Module({})
//
// Empty if independent
//
@After()
class ModuleA {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware)
      .forRoutes('*');
  }
}

@Module({})
//
// Pass module that should configure it's middlewares
// before the current one
//
@After(ModuleA)
class ModuleB {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecondMiddlewareThatShouldBeExecutedAfterTheFirstOne)
      .forRoutes('*');
  }
}

@Module({})
//
// ...Or even pass several modules
//
@After(ModuleA, ModuleB)
class ModuleC {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TheLastMiddleware)
      .forRoutes('*');
  }
}

@Module({
  // And for now it does not matter in which
  // order modules are set in `imports` field
  // Middlewares will be setup in the right order.
  imports: [ModuleC, ModuleA, ModuleB, ...],
  controllers: [...]
})
class App {}
```

---

<h2 align="center">Do you use this library?<br/>Don't be shy to give it a star! ★</h2>

Also if you are into NestJS ecosystem you may be interested in one of my other libs:

[nestjs-pino](https://github.com/iamolegga/nestjs-pino)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-pino?style=flat-square)](https://github.com/iamolegga/nestjs-pino)
[![npm](https://img.shields.io/npm/dm/nestjs-pino?style=flat-square)](https://www.npmjs.com/package/nestjs-pino)

Platform agnostic logger for NestJS based on [pino](http://getpino.io/) with request context in every log

---

[nestjs-session](https://github.com/iamolegga/nestjs-session)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-session?style=flat-square)](https://github.com/iamolegga/nestjs-session)
[![npm](https://img.shields.io/npm/dm/nestjs-session?style=flat-square)](https://www.npmjs.com/package/nestjs-session)

Idiomatic session module for NestJS. Built on top of [express-session](https://www.npmjs.com/package/express-session)

---

[nestjs-cookie-session](https://github.com/iamolegga/nestjs-cookie-session)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-cookie-session?style=flat-square)](https://github.com/iamolegga/nestjs-cookie-session)
[![npm](https://img.shields.io/npm/dm/nestjs-cookie-session?style=flat-square)](https://www.npmjs.com/package/nestjs-cookie-session)

Idiomatic cookie session module for NestJS. Built on top of [cookie-session](https://www.npmjs.com/package/cookie-session)

---

[nestjs-roles](https://github.com/iamolegga/nestjs-roles)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-roles?style=flat-square)](https://github.com/iamolegga/nestjs-roles)
[![npm](https://img.shields.io/npm/dm/nestjs-roles?style=flat-square)](https://www.npmjs.com/package/nestjs-roles)

Type safe roles guard and decorator made easy

---

[nestjs-injectable](https://github.com/segmentstream/nestjs-injectable)

[![GitHub stars](https://img.shields.io/github/stars/segmentstream/nestjs-injectable?style=flat-square)](https://github.com/segmentstream/nestjs-injectable)
[![npm](https://img.shields.io/npm/dm/nestjs-injectable?style=flat-square)](https://www.npmjs.com/package/nestjs-injectable)

`@Injectable()` on steroids that simplifies work with inversion of control in your hexagonal architecture

---

[nest-ratelimiter](https://github.com/iamolegga/nestjs-ratelimiter)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-ratelimiter?style=flat-square)](https://github.com/iamolegga/nestjs-ratelimiter)
[![npm](https://img.shields.io/npm/dm/nest-ratelimiter?style=flat-square)](https://www.npmjs.com/package/nest-ratelimiter)

Distributed consistent flexible NestJS rate limiter based on Redis

---

[create-nestjs-middleware-module](https://github.com/iamolegga/create-nestjs-middleware-module)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/create-nestjs-middleware-module?style=flat-square)](https://github.com/iamolegga/create-nestjs-middleware-module)
[![npm](https://img.shields.io/npm/dm/create-nestjs-middleware-module?style=flat-square)](https://www.npmjs.com/package/create-nestjs-middleware-module)

Create simple idiomatic NestJS module based on Express/Fastify middleware in just a few lines of code with routing out of the box

---

[nestjs-configure-after](https://github.com/iamolegga/nestjs-configure-after)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-configure-after?style=flat-square)](https://github.com/iamolegga/nestjs-configure-after)
[![npm](https://img.shields.io/npm/dm/nestjs-configure-after?style=flat-square)](https://www.npmjs.com/package/nestjs-configure-after)

Declarative configuration of NestJS middleware order

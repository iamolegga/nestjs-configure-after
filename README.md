<h1 align="center">nestjs-configure-after</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/nestjs-configure-after">
    <img alt="npm" src="https://img.shields.io/npm/v/nestjs-configure-after" />
  </a>
  <a href="https://www.npmjs.com/package/nestjs-configure-after">
    <img alt="npm" src="https://img.shields.io/npm/dm/nestjs-configure-after" />
  </a>
  <a href="https://github.com/iamolegga/nestjs-configure-after/actions">
    <img alt="GitHub branch checks state" src="https://badgen.net/github/checks/iamolegga/nestjs-configure-after">
  </a>
  <a href="https://codeclimate.com/github/iamolegga/nestjs-configure-after/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/c60f33b6ad5f9e96d358/test_coverage" />
  </a>
  <a href="https://snyk.io/test/github/iamolegga/nestjs-configure-after">
    <img alt="Known Vulnerabilities" src="https://snyk.io/test/github/iamolegga/nestjs-configure-after/badge.svg" />
  </a>
  <a href="https://libraries.io/npm/nestjs-configure-after">
    <img alt="Libraries.io" src="https://img.shields.io/librariesio/release/npm/nestjs-configure-after">
  </a>
  <img alt="Dependabot" src="https://badgen.net/github/dependabot/iamolegga/nestjs-configure-after">
</p>

Using NestJS?

Do you have middlewares set via `configure(consuer: MiddlewareConsumer) {}` and want to control the order of execution of these middlewares?

## Install

```sh
npm i nestjs-configure-after
```

## Example

Let's assume we have ModuleA, ModuleB, and ModuleC, and each has its own middleware setup. And we want these middlewares to be set in the correct order, like A -> B -> C. By default NestJS does not provide the way to set the order. But with this library it's possible:

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

<h2 align="center">Do you use this library?<br/>Don't be shy to give it a star! ★</h2>

<h3 align="center">Also if you are into NestJS you might be interested in one of my <a href="https://github.com/iamolegga#nestjs">other NestJS libs</a>.</h3>

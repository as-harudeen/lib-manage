import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { ParserMiddleware } from "./parser.middleware";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseInterceptor } from "../interceptors/response.interceptor";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ParserMiddleware).forRoutes("*");
  }
}

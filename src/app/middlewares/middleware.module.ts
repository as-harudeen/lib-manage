import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { ParserMiddleware } from "./parser.middleware";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseInterceptor } from "../interceptors/response.interceptor";
import { HttpExceptionFilter } from "../filters/http-exception.filter";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ParserMiddleware).forRoutes("*");
  }
}

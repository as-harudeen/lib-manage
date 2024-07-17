import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { ParserMiddleware } from "./parser.middleware";
import { APP_PIPE } from "@nestjs/core";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ParserMiddleware).forRoutes("*");
  }
}

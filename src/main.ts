import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ConfigService } from "@nestjs/config";
import { swaggerBootstrap } from "./swagger.bootstrap";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix("/api", {
    exclude: ["/api-doc"],
  });

  const port = configService.get<number>("app.port");

  swaggerBootstrap(app);

  await app.listen(port);
}
bootstrap();

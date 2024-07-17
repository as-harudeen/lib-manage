import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerBootstrap = (app: INestApplication) => {
  const configService = app.get<ConfigService>(ConfigService);
  const appName = configService.get<string>("app.appName");

  const prefix = configService.get<string>("swagger.prefix");
  const description = configService.get<string>("swagger.description");
  const version = configService.get<string>("swagger.version");

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(prefix, app, document);
};

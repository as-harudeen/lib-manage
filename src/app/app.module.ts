import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "src/common/common.module";
import { config } from "src/configs";
import { RouterModule } from "src/router/router.module";
import { MiddlewareModule } from "./middlewares/middleware.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
      cache: true,
    }),
    MiddlewareModule,
    CommonModule,
    RouterModule,
  ],
})
export class AppModule {}

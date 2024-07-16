import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "./database/services/database.service";
import { DB_CONNECTION_NAME } from "./database/constants/database.constant";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: DB_CONNECTION_NAME,
      imports: [DatabaseModule],
      inject: [DatabaseService],
      useFactory: (databaseService: DatabaseService) =>
        databaseService.createMongooseOptions(),
    }),
  ],
})
export class CommonModule {}

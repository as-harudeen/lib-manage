import { Module } from "@nestjs/common";
import { AuthorRepository } from "./repositories/author.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Author, authorSchema } from "./entities/author.entity";
import { DB_CONNECTION_NAME } from "../../../common/database/constants/database.constant";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Author.name, schema: authorSchema }],
      DB_CONNECTION_NAME,
    ),
  ],
  providers: [AuthorRepository],
  exports: [AuthorRepository],
})
export class AuthorRepositoryModule {}

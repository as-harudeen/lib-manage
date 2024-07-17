import { Module } from "@nestjs/common";
import { BookRepository } from "./repositories/book.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, bookSchema } from "./entities/book.entity";
import { DB_CONNECTION_NAME } from "src/common/database/constants/database.constant";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Book.name, schema: bookSchema }],
      DB_CONNECTION_NAME,
    ),
  ],
  providers: [BookRepository],
  exports: [BookRepository],
})
export class BookRepositoryModule {}

import { Module } from "@nestjs/common";
import { BookRepositoryModule } from "./repository/repository.module";
import { AuthorModule } from "../author/author.moudule";
import { BooksService } from "./services/books.service";
import { BooksController } from "./controllers/books.controller";

@Module({
  imports: [BookRepositoryModule, AuthorModule],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BookModule {}

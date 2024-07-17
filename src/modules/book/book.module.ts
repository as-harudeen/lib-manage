import { Module } from "@nestjs/common";
import { BookRepositoryModule } from "./repository/repository.module";
import { AuthorModule } from "../author/author.moudule";
import { BooksService } from "./services/books.service";

@Module({
  imports: [BookRepositoryModule, AuthorModule],
  providers: [BooksService],
})
export class BookModule {}

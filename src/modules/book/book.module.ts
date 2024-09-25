import { forwardRef, Module } from "@nestjs/common";
import { BookRepositoryModule } from "./repository/repository.module";
import { AuthorModule } from "../author/author.moudule";
import { BooksService } from "./services/books.service";
import { BooksController } from "./controllers/books.controller";
import { S3FileUploadService } from "src/app/services/s3-file-upload.service";

@Module({
  imports: [BookRepositoryModule, forwardRef(() => AuthorModule)],
  providers: [BooksService, S3FileUploadService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BookModule {}

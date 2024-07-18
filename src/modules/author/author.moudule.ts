import { forwardRef, Module } from "@nestjs/common";
import { AuthorRepositoryModule } from "./repository/author-repository.module";
import { AuthorService } from "./services/author.service";
import { AuthorController } from "./controllers/author.controller";
import { BookModule } from "../book/book.module";

@Module({
  imports: [AuthorRepositoryModule, forwardRef(() => BookModule)],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}

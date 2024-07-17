import { Module } from "@nestjs/common";
import { AuthorModule } from "src/modules/author/author.moudule";
import { BookModule } from "src/modules/book/book.module";

@Module({
  imports: [AuthorModule, BookModule],
})
export class RouterModule {}

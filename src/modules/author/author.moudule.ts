import { Module } from "@nestjs/common";
import { AuthorRepositoryModule } from "./repository/author-repository.module";
import { AuthorService } from "./services/author.service";
import { AuthorController } from "./controllers/author.controller";

@Module({
  imports: [AuthorRepositoryModule],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}

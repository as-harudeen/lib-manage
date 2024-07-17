import { Module } from "@nestjs/common";
import { AuthorModule } from "src/modules/author/author.moudule";

@Module({
  imports: [AuthorModule],
})
export class RouterModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { AuthorService } from "../services/author.service";
import { CreateAuthorDto } from "../dto/create-author.dto";
import { UpdateAuthorDto } from "../dto/update-author.dto";

@Controller("author")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorService.create(createAuthorDto);
  }

  @Get()
  async getAllAuthors() {
    return await this.authorService.findAll();
  }

  @Get(":id")
  async getAuthorById(@Param("id") id: string) {
    return await this.authorService.findById(id);
  }

  @Patch(":id")
  async updateAuthorById(
    @Param("id") id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.updateById(id, updateAuthorDto);
  }

  @Delete(":id")
  async deleteAuthorById(@Param("id") id: string) {
    return await this.authorService.deleteById(id);
  }
}

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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Author")
@Controller("author")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiCreatedResponse({
    description: "The author has been successfully created",
  })
  @ApiBadRequestResponse({ description: "Validation failed" })
  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorService.create(createAuthorDto);
  }

  @ApiResponse({ status: 200, description: "Get all authors" })
  @Get()
  async getAllAuthors() {
    return await this.authorService.findAll();
  }

  @ApiResponse({ status: 200, description: "Get specific author by id" })
  @Get(":id")
  async getAuthorById(@Param("id") id: string) {
    return await this.authorService.findById(id);
  }

  @ApiResponse({ status: 200, description: "update specific author by id" })
  @Patch(":id")
  async updateAuthorById(
    @Param("id") id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.updateById(id, updateAuthorDto);
  }

  @ApiResponse({ status: 200, description: "delete specific author by id" })
  @Delete(":id")
  async deleteAuthorById(@Param("id") id: string) {
    return await this.authorService.deleteById(id);
  }
}

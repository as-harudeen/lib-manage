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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BooksService } from "../../../modules/book/services/books.service";

@ApiTags("Authors")
@Controller("authors")
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BooksService,
  ) {}

  @ApiOperation({ summary: "Create an author" })
  @ApiCreatedResponse({
    description: "The author has been successfully created",
  })
  @ApiBadRequestResponse({ description: "Validation failed" })
  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorService.create(createAuthorDto);
  }

  @ApiOperation({ summary: "Get all athors" })
  @ApiResponse({ status: 200, description: "Get all authors" })
  @Get()
  async getAllAuthors() {
    return await this.authorService.findAll();
  }

  @ApiOperation({ summary: "Get an author by id" })
  @ApiResponse({ status: 200, description: "Get specific author by id" })
  @Get(":id")
  async getAuthorById(@Param("id") id: string) {
    return await this.authorService.findById(id);
  }

  @ApiOperation({ summary: "Update an author" })
  @ApiResponse({ status: 200, description: "update specific author by id" })
  @Patch(":id")
  async updateAuthorById(
    @Param("id") id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.updateById(id, updateAuthorDto);
  }

  @ApiOperation({ summary: "Delete an author" })
  @ApiResponse({ status: 200, description: "delete specific author by id" })
  @Delete(":id")
  async deleteAuthorById(@Param("id") id: string) {
    await this.bookService.deleteAuthorBooksByIAuthorId(id);
    return await this.authorService.deleteById(id);
  }
}

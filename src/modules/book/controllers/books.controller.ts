import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { BooksService } from "../services/books.service";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";
import { BooksWithinDatesDto } from "../dto/date.dto";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthorService } from "../../author/services/author.service";

@ApiTags("Book")
@Controller("book")
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorService: AuthorService,
  ) {}

  @ApiCreatedResponse({ description: "Book has been created successfully" })
  @ApiBadRequestResponse({ description: "Validation failed" })
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const isAuthorExist = await this.authorService.isExist(
      createBookDto.authorId,
    );
    if (!isAuthorExist)
      throw new BadRequestException(
        `Author with ID '${createBookDto.authorId}' does not exist`,
      );
    return await this.booksService.create(createBookDto);
  }

  @ApiResponse({ status: 200, description: "Get all books" })
  @Get()
  async getAllBooks() {
    return await this.booksService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: "Get all books within a certain date rage",
  })
  @ApiBadRequestResponse({ description: "Validation failed" })
  @Get("/date-range")
  async getBooksWithinDateRange(
    @Query() booksWithinDatesDto: BooksWithinDatesDto,
  ) {
    return await this.booksService.findBooksWithinCertainDateRage(
      booksWithinDatesDto,
    );
  }

  @ApiResponse({ status: 200, description: "Get book by id" })
  @Get(":id")
  async getBookById(@Param("id") id: string) {
    return await this.booksService.findById(id);
  }

  @ApiResponse({ status: 200, description: "Update book by id" })
  @Patch(":id")
  async updateBookById(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updateById(id, updateBookDto);
  }

  @ApiResponse({ status: 200, description: "Delete book by id" })
  @Delete(":id")
  async deleteBookById(@Param("id") id: string) {
    return await this.booksService.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    description: "Get all books of anthor by authorId",
  })
  @ApiBadRequestResponse({ description: "Validation failed" })
  @Get("author/:id")
  async getAuthorBooksByAuthorId(@Param("id") id: string) {
    return await this.booksService.findAuthorBooksByAuthorId(id);
  }
}

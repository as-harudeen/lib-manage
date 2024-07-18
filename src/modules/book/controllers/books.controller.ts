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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthorService } from "../../author/services/author.service";
import { PaginationDto } from "../dto/pagination.dto";

@ApiTags("Book")
@Controller("book")
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorService: AuthorService,
  ) {}

  @ApiOperation({ summary: "Create a book" })
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

  @ApiOperation({ summary: "Get books with pagination" })
  @ApiResponse({ status: 200 })
  @Get()
  async getAllBooks(@Query() { page, limit }: PaginationDto) {
    return await this.booksService.findAll(page, limit);
  }

  @ApiOperation({ summary: "Get all books within a certain date rage" })
  @ApiResponse({
    status: 200,
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

  @ApiOperation({ summary: "Get book by id" })
  @ApiResponse({ status: 200, description: "book has been returned" })
  @Get(":id")
  async getBookById(@Param("id") id: string) {
    return await this.booksService.findById(id);
  }

  @ApiOperation({ summary: "Update book by id" })
  @ApiResponse({ status: 200, description: "Book has been updated" })
  @Patch(":id")
  async updateBookById(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updateById(id, updateBookDto);
  }

  @ApiOperation({ summary: "Delete book by id" })
  @ApiResponse({ status: 200, description: "book has been deleted" })
  @Delete(":id")
  async deleteBookById(@Param("id") id: string) {
    return await this.booksService.deleteById(id);
  }

  @ApiOperation({ summary: "Get all books of anthor by authorId" })
  @ApiResponse({
    status: 200,
    description: "books of an author has been returned",
  })
  @ApiBadRequestResponse({ description: "Validation failed" })
  @Get("author/:id")
  async getAuthorBooksByAuthorId(@Param("id") id: string) {
    return await this.booksService.findAuthorBooksByAuthorId(id);
  }
}

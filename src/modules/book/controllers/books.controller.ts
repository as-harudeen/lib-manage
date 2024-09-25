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
  UploadedFile,
  UseInterceptors,
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
import { FileValidationPipe } from "../validators/file.validator";
import { ApiFileUpload } from "src/common/decorators/api-file.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 2MB

@ApiTags("Books")
@Controller("books")
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
  @ApiFileUpload("file")
  @Patch(":id")
  async updateBookById(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updateById(id, updateBookDto);
  }

  @ApiOperation({ summary: "Upload cover picture" })
  @ApiResponse({
    status: 200,
    description: "Cover picture updated successfully",
  })
  @Patch(":id/cover-picture")
  @UseInterceptors(FileInterceptor("file"))
  async uploadCoverPicture(
    @Param("id") id: string,
    @UploadedFile(new FileValidationPipe(MAX_FILE_SIZE))
    file: Express.Multer.File,
  ) {
    return await this.booksService.uploadCoverPicture(id, file);
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

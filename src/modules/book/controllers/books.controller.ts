import {
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

@Controller("book")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async getAllBooks() {
    return await this.booksService.findAll();
  }

  @Get("/date-range")
  async getBooksWithinDateRange(
    @Query() booksWithinDatesDto: BooksWithinDatesDto,
  ) {
    return await this.booksService.findBooksWithinCertainDateRage(
      booksWithinDatesDto,
    );
  }

  @Get(":id")
  async getBookById(@Param("id") id: string) {
    return await this.booksService.findById(id);
  }

  @Patch(":id")
  async updateBookById(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updateById(id, updateBookDto);
  }

  @Delete(":id")
  async deleteBookById(@Param("id") id: string) {
    return await this.booksService.deleteById(id);
  }
}

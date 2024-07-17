import { Injectable } from "@nestjs/common";
import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Book, BookDoc } from "../entities/book.entity";
import { Model } from "mongoose";
import { CreateBookDto } from "../../dto/create-book.dto";
import { UpdateBookDto } from "../../dto/update-book.dto";
import { BooksWithinDatesDto } from "../../dto/date.dto";

@Injectable()
export class BookRepository {
  constructor(
    @DatabaseModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookDoc> {
    return await this.bookModel.create(createBookDto);
  }

  async findById(id: string): Promise<BookDoc | null> {
    return await this.bookModel.findById(id);
  }

  async findAll(): Promise<BookDoc[]> {
    return await this.bookModel.find();
  }

  async updateById(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookDoc | null> {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<BookDoc | null> {
    return await this.bookModel.findByIdAndDelete(id);
  }

  async findAllByAuthorId(authorId: string): Promise<BookDoc[]> {
    return await this.bookModel.find({ authorId });
  }

  async findBooksWithinDates(
    booksWithinDateDto: BooksWithinDatesDto,
  ): Promise<BookDoc[]> {
    return await this.bookModel.find({
      $and: [
        { publishedDate: { $gte: booksWithinDateDto.dateFrom } },
        { publishedDate: { $lte: booksWithinDateDto.dateTo } },
      ],
    });
  }
}

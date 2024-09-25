import { Injectable } from "@nestjs/common";
import { DatabaseModel } from "../../../../common/database/decorators/database.decorator";
import { Book, BookDoc } from "../entities/book.entity";
import { Model } from "mongoose";
import { CreateBookDto } from "../../dto/create-book.dto";
import { UpdateBookDto } from "../../dto/update-book.dto";
import { BooksWithinDatesDto } from "../../dto/date.dto";
import { BookDto } from "../../dto/book.dto";

@Injectable()
export class BookRepository {
  constructor(
    @DatabaseModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookDto> {
    const newBook = await this.bookModel.create(createBookDto);
    return this.mapToBookDto(newBook);
  }

  async findById(id: string): Promise<BookDto | null> {
    const book = await this.bookModel.findById(id);
    return this.mapToBookDto(book);
  }

  async findAll(page: number, limit: number): Promise<BookDto[]> {
    const skip = (page - 1) * limit;
    const books = await this.bookModel.find().skip(skip).limit(limit);
    return books.map((book) => this.mapToBookDto(book));
  }

  async updateById(
    id: string,
    updateBookDto: UpdateBookDto | { coverPictureURL?: string },
  ): Promise<BookDto | null> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      updateBookDto,
      {
        new: true,
      },
    );
    return this.mapToBookDto(updatedBook);
  }

  async deleteById(id: string): Promise<BookDto | null> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id);
    return this.mapToBookDto(deletedBook);
  }

  async findBooksByAuthorId(authorId: string): Promise<BookDto[]> {
    const books = await this.bookModel.find({ authorId });
    return books.map((book) => this.mapToBookDto(book));
  }

  async findBooksWithinDates({
    from,
    to,
  }: BooksWithinDatesDto): Promise<BookDto[]> {
    const books = await this.bookModel.find({
      $and: [
        { publishedDate: { $gte: from } },
        { publishedDate: { $lte: to } },
      ],
    });
    return books.map((book) => this.mapToBookDto(book));
  }

  async deleteBooksByAuthorId(id: string) {
    await this.bookModel.deleteMany({ authorId: id });
  }

  private mapToBookDto(bookDoc: BookDoc) {
    if (!bookDoc) return null;

    return {
      id: bookDoc._id.toString(),
      title: bookDoc.title,
      description: bookDoc.description,
      publishedDate: bookDoc.publishedDate,
      authorId: bookDoc.authorId.toString(),
      coverPictureURL: bookDoc.coverPictureURL,
    };
  }
}

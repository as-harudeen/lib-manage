import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { BookRepository } from "../repository/repositories/book.repository";
import { CreateBookDto } from "../dto/create-book.dto";
import { AuthorService } from "src/modules/author/services/author.service";
import { UpdateBookDto } from "../dto/update-book.dto";
import { BooksWithinDatesDto } from "../dto/date.dto";

@Injectable()
export class BooksService {
  constructor(
    private readonly bookRepository: BookRepository,
    @Inject(forwardRef(() => AuthorService))
    private readonly authorService: AuthorService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const isAuthorExist = await this.authorService.isExist(
      createBookDto.authorId,
    );
    if (!isAuthorExist)
      throw new BadRequestException(
        `Author with ID '${createBookDto.authorId}' does not exist`,
      );

    return await this.bookRepository.create(createBookDto);
  }

  async findById(id: string) {
    return await this.bookRepository.findById(id);
  }

  async findAll() {
    return await this.bookRepository.findAll();
  }

  async updateById(id: string, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.updateById(id, updateBookDto);
  }

  async deleteById(id: string) {
    return await this.bookRepository.deleteById(id);
  }

  async findAuthorBooksByAuthorId(authorId: string) {
    const isAuthorExist = await this.authorService.isExist(authorId);
    if (!isAuthorExist)
      throw new BadRequestException(
        `Author with ID '${authorId}' does not exist`,
      );

    return await this.bookRepository.findBooksByAuthorId(authorId);
  }

  async findBooksWithinCertainDateRage(dateDto: BooksWithinDatesDto) {
    return await this.bookRepository.findBooksWithinDates(dateDto);
  }

  async deleteAuthorBooksByIAuthorId(authorId: string) {
    return await this.bookRepository.deleteBooksByAuthorId(authorId);
  }
}

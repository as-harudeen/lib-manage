import { Injectable } from "@nestjs/common";
import { BookRepository } from "../repository/repositories/book.repository";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";
import { BooksWithinDatesDto } from "../dto/date.dto";
import { S3FileUploadService } from "src/app/services/s3-file-upload.service";

@Injectable()
export class BooksService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly s3FileUploadService: S3FileUploadService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    return await this.bookRepository.create(createBookDto);
  }

  async findById(id: string) {
    return await this.bookRepository.findById(id);
  }

  async findAll(page: number, limit: number) {
    return await this.bookRepository.findAll(page, limit);
  }

  async updateById(id: string, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.updateById(id, updateBookDto);
  }

  async uploadCoverPicture(id: string, file: Express.Multer.File) {
    const key = await this.s3FileUploadService.uploadFile(file);
    const url = `${process.env.BUCKET_URL}/${key}`;
    return await this.bookRepository.updateById(id, { coverPictureURL: url });
  }

  async deleteById(id: string) {
    return await this.bookRepository.deleteById(id);
  }

  async findAuthorBooksByAuthorId(authorId: string) {
    return await this.bookRepository.findBooksByAuthorId(authorId);
  }

  async findBooksWithinCertainDateRage(dateDto: BooksWithinDatesDto) {
    return await this.bookRepository.findBooksWithinDates(dateDto);
  }

  async deleteAuthorBooksByIAuthorId(authorId: string) {
    return await this.bookRepository.deleteBooksByAuthorId(authorId);
  }
}

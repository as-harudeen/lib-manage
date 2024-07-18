import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthorRepository } from "../repository/repositories/author.repository";
import { CreateAuthorDto } from "../dto/create-author.dto";
import { UpdateAuthorDto } from "../dto/update-author.dto";
import { BooksService } from "../../../modules/book/services/books.service";

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepository.create(createAuthorDto);
  }

  async findById(id: string) {
    return await this.authorRepository.findById(id);
  }

  async findAll() {
    return await this.authorRepository.findAll();
  }

  async updateById(id: string, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepository.updateById(id, updateAuthorDto);
  }

  async deleteById(id: string) {
    await this.booksService.deleteAuthorBooksByIAuthorId(id);
    return await this.authorRepository.deleteById(id);
  }

  async isExist(id: string): Promise<boolean> {
    const author = await this.authorRepository.findById(id);
    return author !== null;
  }
}

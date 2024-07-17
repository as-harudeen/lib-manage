import { Injectable } from "@nestjs/common";
import { AuthorRepository } from "../repository/repositories/author.repository";
import { CreateAuthorDto } from "../dto/create-author.dto";
import { UpdateAuthorDto } from "../dto/update-author.dto";

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

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
    return await this.authorRepository.deleteById(id);
  }
}

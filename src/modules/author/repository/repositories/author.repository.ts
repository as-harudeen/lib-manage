import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Author, AuthorDoc } from "../entities/author.entity";
import { Model } from "mongoose";
import { UpdateAuthorDto } from "../../dto/update-author.dto";
import { CreateAuthorDto } from "../../dto/create-author.dto";
import { Injectable } from "@nestjs/common";
import { AuthorDto } from "../../dto/autho.dto";

@Injectable()
export class AuthorRepository {
  constructor(
    @DatabaseModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorDto> {
    const author = await this.authorModel.create(createAuthorDto);
    return this.mapToAuthorDto(author);
  }

  async findById(id: string): Promise<AuthorDto | null> {
    const author = await this.authorModel.findById(id);
    return this.mapToAuthorDto(author);
  }

  async findAll(): Promise<AuthorDto[]> {
    const authors = await this.authorModel.find();
    return authors.map((author) => this.mapToAuthorDto(author));
  }

  async updateById(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorDto> {
    const updatedAuthor = await this.authorModel.findByIdAndUpdate(
      id,
      updateAuthorDto,
      {
        new: true,
      },
    );
    return this.mapToAuthorDto(updatedAuthor);
  }

  async deleteById(id: string): Promise<AuthorDto> {
    const deletedAuthor = await this.authorModel.findByIdAndDelete(id);
    return this.mapToAuthorDto(deletedAuthor);
  }

  private mapToAuthorDto(author: AuthorDoc): AuthorDto {
    if (!author) return null;

    return {
      id: author._id.toString(),
      name: author.name,
      birthdate: author.birthdate,
      biography: author.biography,
    };
  }
}

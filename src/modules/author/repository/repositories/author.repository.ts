import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Author, AuthorDoc } from "../entities/author.entity";
import { Model } from "mongoose";
import { UpdateAuthorDto } from "../../dto/update-author.dto";
import {
  CreateAuthorDto,
  CreateAuthorResponseDto,
} from "../../dto/create-author.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthorRepository {
  constructor(
    @DatabaseModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(
    createAuthorDto: CreateAuthorDto,
  ): Promise<CreateAuthorResponseDto> {
    return await this.authorModel.create(createAuthorDto);
  }

  async findById(id: string): Promise<AuthorDoc> {
    return await this.authorModel.findById(id);
  }

  async findAll(): Promise<AuthorDoc[]> {
    return await this.authorModel.find();
  }

  async updateById(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorDoc> {
    return await this.authorModel.findByIdAndUpdate(id, updateAuthorDto, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<AuthorDoc> {
    return await this.authorModel.findByIdAndDelete(id);
  }
}

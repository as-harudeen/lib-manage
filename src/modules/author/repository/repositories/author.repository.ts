import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Author } from "../entities/author.entity";
import { Model } from "mongoose";
import { UpdateAuthorDto } from "../../dto/update-author.dto";
import { CreateAuthorDto } from "../../dto/create-author.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthorRepository {
  constructor(
    @DatabaseModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(CreateAuthorDto: CreateAuthorDto) {
    return await this.authorModel.create(CreateAuthorDto);
  }

  async findById(id: string) {
    return await this.authorModel.findById(id);
  }

  async findAll() {
    return await this.authorModel.find();
  }

  async updateById(id: string, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorModel.findByIdAndUpdate(id, updateAuthorDto, {
      new: true,
    });
  }

  async deleteById(id: string) {
    return await this.authorModel.findByIdAndDelete(id);
  }
}

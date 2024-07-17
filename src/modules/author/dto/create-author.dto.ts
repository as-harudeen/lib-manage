import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { MinAuthorAge } from "../validators/min-author-age.validator";
import { Type } from "class-transformer";
import {
  AUTHOR_NAME_MAX_LENGTH,
  AUTHOR_NAME_MIN_LENGTH,
} from "../constants/author.constant";

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Length(AUTHOR_NAME_MIN_LENGTH, AUTHOR_NAME_MAX_LENGTH)
  name: string;

  @IsString()
  @IsOptional()
  biography?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @MinAuthorAge()
  birthdate: Date;
}

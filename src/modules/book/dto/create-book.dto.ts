import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator";
import { IsValidPublishDate } from "../validators/published-date.validator";
import {
  BOOK_DESC_MAX_LENGTH,
  BOOK_TITLE_MIN_LENGTH,
} from "../constants/book.contant";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Length(BOOK_TITLE_MIN_LENGTH, BOOK_DESC_MAX_LENGTH)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(BOOK_DESC_MAX_LENGTH)
  description?: string;

  @IsMongoId()
  authorId: string;

  @IsDateString()
  @IsValidPublishDate()
  publishedDate: Date;
}

export class CreateBookResponseDto extends CreateBookDto {
  _id: string;
}

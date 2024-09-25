import {
  IsDefined,
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
  BOOK_TITLE_MAX_LENGTH,
  BOOK_TITLE_MIN_LENGTH,
} from "../constants/book.contant";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Types } from "mongoose";

export class CreateBookDto {
  @ApiProperty({
    type: String,
    description: "Title of a book",
    minLength: BOOK_TITLE_MIN_LENGTH,
    maxLength: BOOK_TITLE_MAX_LENGTH,
    example: "The monk who sold his ferrari",
  })
  @IsString()
  @IsNotEmpty()
  @Length(BOOK_TITLE_MIN_LENGTH, BOOK_DESC_MAX_LENGTH)
  title: string;

  @ApiPropertyOptional({
    type: String,
    description: "Description of a book",
    maxLength: BOOK_DESC_MAX_LENGTH,
    example:
      "The Monk Who Sold His Ferrari is a self-help book by Robin Sharma, a writer and motivational speaker.",
  })
  @IsOptional()
  @IsString()
  @MaxLength(BOOK_DESC_MAX_LENGTH)
  description?: string;

  @ApiProperty({
    type: Types.ObjectId,
    description: "Id of author",
    example: "669776b8230c041db91837ce",
  })
  @IsMongoId()
  authorId: string;

  @ApiProperty({
    type: Date,
    description: "Published date of a book",
    example: "1999-06-20",
  })
  @IsDefined()
  @Type(() => Date)
  @IsValidPublishDate()
  publishedDate: Date;
}

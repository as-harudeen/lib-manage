import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { MinAuthorAge } from "../validators/min-author-age.validator";
import { Type } from "class-transformer";
import {
  AUTHOR_BIOGRAPHY_MAX_LENGTH,
  AUTHOR_MIN_AGE,
  AUTHOR_NAME_MAX_LENGTH,
  AUTHOR_NAME_MIN_LENGTH,
} from "../constants/author.constant";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto {
  @ApiProperty({
    required: true,
    type: String,
    minLength: AUTHOR_NAME_MIN_LENGTH,
    maxLength: AUTHOR_NAME_MAX_LENGTH,
    example: "Robin sharma",
    default: "Robin sharma",
  })
  @IsString()
  @IsNotEmpty()
  @Length(AUTHOR_NAME_MIN_LENGTH, AUTHOR_NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    type: String,
    maxLength: AUTHOR_BIOGRAPHY_MAX_LENGTH,
    example:
      "Canadian writer, best known for his The Monk Who Sold His Ferrari book series",
  })
  @IsString()
  @IsOptional()
  biography?: string;

  @ApiProperty({
    type: Date,
    required: true,
    format: "year-month-date",
    description: `Birthdate of an author (min age is ${AUTHOR_MIN_AGE}) `,
    example: "1964-06-16",
    default: "1964-06-16",
  })
  @IsNotEmpty()
  @Type(() => Date)
  @MinAuthorAge()
  birthdate: Date;
}

import { ApiProperty } from "@nestjs/swagger";
import {
  AUTHOR_BIOGRAPHY_MAX_LENGTH,
  AUTHOR_MIN_AGE,
  AUTHOR_NAME_MAX_LENGTH,
  AUTHOR_NAME_MIN_LENGTH,
} from "../constants/author.constant";

export class AuthorDto {
  @ApiProperty({ type: String, example: "669776b8230c041db91837ce" })
  id: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: AUTHOR_NAME_MIN_LENGTH,
    maxLength: AUTHOR_NAME_MAX_LENGTH,
    example: "Robin sharma",
    default: "Robin sharma",
  })
  name: string;

  @ApiProperty({
    type: String,
    maxLength: AUTHOR_BIOGRAPHY_MAX_LENGTH,
    example:
      "Canadian writer, best known for his The Monk Who Sold His Ferrari book series",
  })
  biography?: string;

  @ApiProperty({
    type: Date,
    required: true,
    format: "year-month-date",
    description: `Birthdate of an author (min age is ${AUTHOR_MIN_AGE}) `,
    example: "1964-06-16",
    default: "1964-06-16",
  })
  birthdate: Date;
}

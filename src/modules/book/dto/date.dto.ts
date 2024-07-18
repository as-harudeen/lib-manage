import { Type } from "class-transformer";
import { IsValidDateRage } from "../validators/date-rage.validator";
import { ApiProperty } from "@nestjs/swagger";

export class BooksWithinDatesDto {
  @ApiProperty({
    name: "from",
    type: Date,
    description: "from date of date range",
    example: "2000-10-10",
  })
  @Type(() => Date)
  from: Date;

  @ApiProperty({
    name: "to",
    type: Date,
    description: "to date of date range",
    example: "2010-10-10",
  })
  @Type(() => Date)
  @IsValidDateRage()
  to: Date;
}

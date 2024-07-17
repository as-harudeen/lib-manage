import { IsDateString, ValidateIf } from "class-validator";

export class BooksWithinDatesDto {
  @IsDateString()
  dateFrom: Date;

  @IsDateString()
  @ValidateIf((object) => object.dateFrom < object.dateTo)
  dateTo: Date;
}

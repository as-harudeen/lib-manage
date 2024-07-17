import { Type } from "class-transformer";
import { IsValidDateRage } from "../validators/date-rage.validator";

export class BooksWithinDatesDto {
  @Type(() => Date)
  from: Date;

  @Type(() => Date)
  @IsValidDateRage()
  to: Date;
}

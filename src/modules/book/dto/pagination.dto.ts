import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class PaginationDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumberString()
  page: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumberString()
  limit: number;
}

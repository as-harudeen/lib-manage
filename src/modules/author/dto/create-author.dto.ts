import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { MinAuthorAge } from "../validators/min-author-age.validator";

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsString()
  @IsOptional()
  biography?: string;

  @IsNotEmpty()
  @MinAuthorAge()
  birthdate: Date;
}

import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { MinAuthorAge } from "../../validators/min-author-age.validator";

export class Author {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @Prop()
  @IsString()
  @IsOptional()
  biography?: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @MinAuthorAge()
  birthdate: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

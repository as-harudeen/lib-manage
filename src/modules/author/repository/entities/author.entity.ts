import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  AUTHOR_BIOGRAPHY_MAX_LENGTH,
  AUTHOR_NAME_MAX_LENGTH,
  AUTHOR_NAME_MIN_LENGTH,
} from "../../constants/author.constant";

@Schema()
export class Author {
  @Prop({
    required: true,
    type: String,
    minlength: AUTHOR_NAME_MIN_LENGTH,
    maxlength: AUTHOR_NAME_MAX_LENGTH,
  })
  name: string;

  @Prop({ type: String, default: "", maxlength: AUTHOR_BIOGRAPHY_MAX_LENGTH })
  biography?: string;

  @Prop({ required: true })
  birthdate: Date;
}

export const authorSchema = SchemaFactory.createForClass(Author);

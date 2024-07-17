import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  BOOK_DESC_MAX_LENGTH,
  BOOK_TITLE_MAX_LENGTH,
  BOOK_TITLE_MIN_LENGTH,
} from "../../constants/book.contant";
import { Author } from "src/modules/author/repository/entities/author.entity";
import mongoose, { HydratedDocument } from "mongoose";

@Schema()
export class Book {
  @Prop({
    required: true,
    type: String,
    minlength: BOOK_TITLE_MIN_LENGTH,
    maxlength: BOOK_TITLE_MAX_LENGTH,
  })
  title: string;

  @Prop({ default: "", type: String, maxlength: BOOK_DESC_MAX_LENGTH })
  description: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Author" })
  authorId: Author;

  @Prop({ required: true, type: Date })
  publishedDate: Date;
}

export type BookDoc = HydratedDocument<Book>;

export const bookSchema = SchemaFactory.createForClass(Book);

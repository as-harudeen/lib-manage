import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  BOOK_DESC_MAX_LENGTH,
  BOOK_TITLE_MAX_LENGTH,
  BOOK_TITLE_MIN_LENGTH,
} from "../../constants/book.contant";
import mongoose, { HydratedDocument, Types } from "mongoose";

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
  authorId: Types.ObjectId;

  @Prop({ required: true, type: Date })
  publishedDate: Date;

  @Prop()
  coverPictureURL?: string;
}

export type BookDoc = HydratedDocument<Book>;

export const bookSchema = SchemaFactory.createForClass(Book);

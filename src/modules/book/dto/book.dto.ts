import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Date })
  publishedDate: Date;

  @ApiProperty({ type: String })
  authorId: string;
}

import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly maxSize: number) {}

  transform(value: unknown) {
    if (!this.isFile(value)) {
      return value;
    }

    if (!value.mimetype.includes("image")) {
      throw new BadRequestException("Invalid file format");
    }

    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `File size should not exceed ${this.maxSize} bytes`,
      );
    }

    return value;
  }

  private isFile(value: unknown): value is Express.Multer.File {
    return (
      typeof value === "object" &&
      value !== null &&
      "mimetype" in value &&
      "size" in value &&
      typeof (value as Express.Multer.File).mimetype === "string" &&
      typeof (value as Express.Multer.File).size === "number"
    );
  }
}

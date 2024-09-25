import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import slugify from "slugify";

@Injectable()
export class S3FileUploadService {
  s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.IAM_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.IAM_SECRET_ACCESS as string,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    const key = "dev-" + "-" + slugify(originalname).slice(0, 5);
    await this.s3_upload(file.buffer, key, file.mimetype);
    return key;
  }

  private async s3_upload(buffer: Buffer, key: string, mimetype: string) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: String(key),
      Body: buffer,
      ContentType: mimetype,
    };

    try {
      return await this.s3.send(new PutObjectCommand(params));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}

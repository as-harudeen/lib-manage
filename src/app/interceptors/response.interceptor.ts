import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Response } from "express";
import { ResponseInterface } from "../../common/response/interfaces/response.interface";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterface> {
    return next
      .handle()
      .pipe(map((res: unknown) => this.responseHandler(res, context)));
  }

  responseHandler(result: any, context: ExecutionContext): ResponseInterface {
    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse();

    const statusCode = response.statusCode;

    return {
      statusCode,
      message: "SUCCESS",
      result,
      error: null,
    };
  }
}

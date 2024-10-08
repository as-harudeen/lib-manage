import { Injectable, NestMiddleware } from "@nestjs/common";
import { json, NextFunction, Request, Response } from "express";

@Injectable()
export class ParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    json()(req, res, next);
  }
}

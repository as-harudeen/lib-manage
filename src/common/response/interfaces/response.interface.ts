export class ResponseInterface {
  statusCode: number;
  message: string;
  error?: Error;
  result?: any;
}

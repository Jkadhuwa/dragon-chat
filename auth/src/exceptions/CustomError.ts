export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export class CustomError extends Error {
  public readonly statusCode: HttpCode;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

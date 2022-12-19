export class AsyncErrorResponse extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  }
}

export class BadRequestError extends AsyncErrorResponse {
  constructor(message: string) {
      super(message, 400);
  }
}

export class ForbiddenRequestError extends AsyncErrorResponse {
  constructor(message: string) {
      super(message, 403);
  }
}

export class NotFoundError extends AsyncErrorResponse {
  constructor(message: string) {
      super(message, 404);
  }
}

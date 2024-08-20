export class HttpError extends Error {
  statusCode: number;
  name: string;

  constructor(message: string, statusCode: number, name: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class UserInputError extends HttpError {
  constructor(message: string) {
    super(message, 400, "Bad Request");
  }
}

export class AuthenticationError extends HttpError {
  constructor(message: string) {
    super(message, 401, "Unauthorized");
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 403, "Forbidden");
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404, "Not Found");
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message: string) {
    super(message, 405, "Not Allowed");
  }
}

export class ResourceConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409, "Conflict");
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 500, "Internal Server Error");
  }
}

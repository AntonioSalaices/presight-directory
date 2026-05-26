import { EErrorCode, EErrorMessage, EStatusCode } from "../enums/errors.enum";

export class AppError extends Error {
  constructor(
    public message: string = EErrorMessage.INTERNAL_ERROR,
    public statusCode: number = EStatusCode.INTERNAL_ERROR,
    public code: EErrorCode = EErrorCode.INTERNAL_ERROR,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = EErrorMessage.NOT_FOUND) {
    super(message, EStatusCode.NOT_FOUND, EErrorCode.NOT_FOUND);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = EErrorMessage.NOT_FOUND) {
    super(message, EStatusCode.BAD_REQUEST, EErrorCode.VALIDATION_ERROR);
  }
}

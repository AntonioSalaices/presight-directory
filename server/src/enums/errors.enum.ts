export enum EErrorCode {
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
}

export enum EErrorMessage {
  NOT_FOUND = "Resource not found",
  VALIDATION_ERROR = "Invalid request",
  INTERNAL_ERROR = "Internal server error",
  RATE_LIMIT_EXCEEDED = "Too many requests",
}

export enum EStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

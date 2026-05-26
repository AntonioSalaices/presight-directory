import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";
import { EErrorCode } from "../enums/errors.enum";

export const errorMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code,
      },
    });

    return;
  }

  console.error(error);

  response.status(500).json({
    error: {
      message: "Internal Server Error",
      code: EErrorCode.INTERNAL_ERROR,
    },
  });
};

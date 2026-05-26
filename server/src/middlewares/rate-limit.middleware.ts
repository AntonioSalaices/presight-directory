import rateLimit from "express-rate-limit";
import { EErrorCode, EErrorMessage } from "../enums/errors.enum";

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      message: EErrorMessage.RATE_LIMIT_EXCEEDED,
      code: EErrorCode.RATE_LIMIT_EXCEEDED,
    },
  },
});

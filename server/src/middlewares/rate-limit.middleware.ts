import rateLimit from "express-rate-limit";
import { EErrorCode, EErrorMessage } from "../enums/errors.enum";

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 100;
const max = Number(process.env.RATE_LIMIT_MAX) || 100;

export const rateLimitMiddleware = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      message: EErrorMessage.RATE_LIMIT_EXCEEDED,
      code: EErrorCode.RATE_LIMIT_EXCEEDED,
    },
  },
});

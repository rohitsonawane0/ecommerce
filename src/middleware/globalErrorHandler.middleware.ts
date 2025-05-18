// middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error/AppError";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status,
    message: err.message,
  });
};

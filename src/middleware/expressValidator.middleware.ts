// src/utils/validation/expressValidator.ts
import { RequestHandler } from "express";
import { AnyZodObject, ZodError } from "zod";
import { BadRequestError } from "../utils/error/BadRequestError";
import { formatZodError } from "../validations/formatZodError";

export const validate =
  (schema: AnyZodObject): RequestHandler =>
  (req, _res, next) => {
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body) ||
      Object.keys(req.body).length === 0
    ) {
      return next(
        new BadRequestError("Request body is required and cannot be empty.")
      );
    }
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const msg = formatZodError(result.error);
      return next(new BadRequestError(msg));
    }

    // replace req.body with the typed data
    req.body = result.data;
    next();
  };

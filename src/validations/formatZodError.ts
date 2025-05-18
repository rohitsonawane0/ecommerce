// src/utils/validation/formatZodError.ts
import { ZodError, ZodIssue } from "zod";

/** Turn a single issue into “field.path: message” */
const formatZodIssue = (issue: ZodIssue): string => {
  const pathString = issue.path.join(".") || "(root)";
  return `${pathString}: ${issue.message}`;
};

/** Grab the first issue and format it */
export const formatZodError = (error: ZodError): string => {
  if (error.issues.length > 0) {
    return formatZodIssue(error.issues[0]);
  }
  return "Invalid input";
};

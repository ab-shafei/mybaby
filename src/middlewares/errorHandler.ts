import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

function isFirebaseError(error: any): error is { code: string } {
  return error && typeof error.code === "string";
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err); // Log the error details for debugging purposes

  // Default error response
  let statusCode = 500;
  let message = "An unexpected error occurred";

  // Handle AppError instances
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === "PrismaClientKnownRequestError") {
    // Handle Prisma-related errors (database errors)
    statusCode = 400;
    message = "Database error occurred";
  } else if (err.name === "JsonWebTokenError") {
    // Handle JWT-related errors
    statusCode = 401;
    message = "Invalid authentication token";
  } else if (err.name === "TokenExpiredError") {
    // Handle expired token errors
    statusCode = 401;
    message = "Authentication token has expired";
  } else if (isFirebaseError(err) && err.code === "auth/email-already-exists") {
    statusCode = 400;
    message = "Email already exists";
  }

  // Send error response
  res.status(statusCode).json({
    error: message,
  });
};

import { NextFunction, Request, Response } from "express";
import { AsyncErrorResponse } from "../errors/AsyncErrorResponse";

export const handleAsyncErrorResponseMiddleware = async (
  err: Error & Partial<AsyncErrorResponse>,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  
  const statusCode = err.statusCode ?? 500;
  const message = err.statusCode ? err.message : "Internal Server Error";
  return res.status(statusCode).json({ message });
};
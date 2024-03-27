import { Request, Response, NextFunction } from "express";
import { HttpError } from "../exceptions/errors.js";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ success: false, error: err.message, type: err.name });
  } else {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

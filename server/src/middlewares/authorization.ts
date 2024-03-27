import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AuthenticationError } from "../exceptions/errors.js";

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return next(new AuthenticationError("Token not found"));
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err: any, data: any) => {
    if (err || !data) {
      return next(new AuthenticationError("Invalid token"));
    }
  });
  return next();
};

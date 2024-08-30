import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AuthenticationError } from "../exceptions/errors.js";

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.token;
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken || !refreshToken) {
    return next(new AuthenticationError("Token not found"));
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as jwt.JwtPayload;
    req.userId = payload.id as string;
  } catch (err) {
    return next(new AuthenticationError("Invalid access token"));
  }
  return next();
};

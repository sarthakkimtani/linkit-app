import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import prisma from "../prisma.js";
import { AuthenticationError, NotFoundError, UserInputError } from "../exceptions/errors.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new UserInputError("Invalid request body"));
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return next(new NotFoundError("Account does not exist"));
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return next(new AuthenticationError("Incorrect password"));
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15min",
  });
  const refreshToken = await generateRefreshToken(user.id);

  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ success: true, userId: user.id, email: user.email, accessToken });
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return next(new UserInputError("Invalid request body"));
  }

  const user = await prisma.user.findFirst({ where: { OR: [{ username }, { email }] } });
  if (user) {
    return next(new UserInputError("Username or Account already exists"));
  }

  const passwordHash = await hash(password, 10);
  const createdUser = await prisma.user.create({
    data: { email, password: passwordHash, username },
  });

  const accessToken = jwt.sign({ id: createdUser.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15min",
  });
  const refreshToken = await generateRefreshToken(createdUser.id);

  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res
    .status(201)
    .json({ success: true, userId: createdUser.id, email: createdUser.email, accessToken });
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.token;
  const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const data = await prisma.token.findFirst({ where: { token: tokenHash } });
  if (!data) {
    return next(new AuthenticationError("Invalid token"));
  }
  if (data.expiry < new Date()) {
    return next(new AuthenticationError("Token expired"));
  }

  const tokenData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload;
  const accessToken = jwt.sign({ id: tokenData.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15min",
  });

  res.status(200).json({ success: true, accessToken });
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.token;
  const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const deletedData = await prisma.token.delete({ where: { token: tokenHash } });
  res.status(200).json({ success: true, userId: deletedData.userId });
};

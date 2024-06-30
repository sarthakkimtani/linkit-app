import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { z } from "zod";

import prisma from "../prisma.js";
import AuthUtils from "../utils/authUtils.js";
import { formatZodIssue } from "../utils/zodUtils.js";
import { NotFoundError, UserInputError } from "../exceptions/errors.js";

const authUtils: AuthUtils = new AuthUtils();

const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signupBody = loginBody.extend({
  username: z.string().min(5),
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginBody.parse(req.body);
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundError("Account does not exist");
    }
    await authUtils.checkPassword(password, user.password);

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15min",
    });
    const refreshToken = await authUtils.generateRefreshToken(user.id);

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      accessToken,
      profile: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = signupBody.parse(req.body);
    await authUtils.findUser(email, username);

    const passwordHash = await authUtils.generatePassword(password);
    const user = await prisma.user.create({
      data: { email, password: passwordHash, username },
    });

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15min",
    });
    const refreshToken = await authUtils.generateRefreshToken(user.id);

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      success: true,
      accessToken,
      profile: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.token;

  try {
    await authUtils.handleRefreshToken(refreshToken);
    const tokenData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload;

    const accessToken = jwt.sign({ id: tokenData.id }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15min",
    });

    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.token;

  try {
    await authUtils.handleRefreshToken(refreshToken);
    const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const deletedData = await prisma.token.delete({ where: { token: tokenHash } });

    res.status(200).clearCookie("token").json({ success: true, userId: deletedData.userId });
  } catch (error) {
    next(error);
  }
};

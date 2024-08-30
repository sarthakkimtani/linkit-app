import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { NotFoundError, ResourceConflictError, UserInputError } from "../exceptions/errors.js";
import { formatZodIssue } from "../utils/zodUtils.js";
import prisma from "../prisma.js";
import AuthUtils from "../utils/authUtils.js";

const authUtils: AuthUtils = new AuthUtils();

const userPayload = z
  .object({
    username: z.string().min(1).optional(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.email !== undefined || data.username !== undefined, {
    message: "Either email or username must be provided",
  });

const passwordPayload = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
});

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const { username, email } = userPayload.parse(req.body);
    if (username) {
      const usernamePayload = await prisma.user.findFirst({ where: { username } });
      if (usernamePayload) {
        return next(new ResourceConflictError("Username already exists"));
      }
    }

    const data = await prisma.user.updateMany({
      where: { id: userId },
      data: { username, email },
    });
    if (data.count == 0) {
      return next(new NotFoundError("Account does not exist"));
    }

    res.status(200).json({ success: true, updatedResource: { username, email } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    console.log(err);
    next(err);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = passwordPayload.parse(req.body);

    const payload = await prisma.user.findFirst({
      where: { id: userId },
      select: { password: true },
    });
    if (!payload) {
      throw new NotFoundError("Account does not exist");
    }

    await authUtils.checkPassword(oldPassword, payload.password);
    const passwordHash = await authUtils.generatePasswordHash(newPassword);

    const data = await prisma.user.update({
      where: { id: userId },
      data: { password: passwordHash },
      select: { id: true },
    });
    res.status(200).json({ success: true, userId: data.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

import { Request, Response, NextFunction } from "express";

import prisma from "../prisma.js";
import { NotFoundError } from "../exceptions/errors.js";

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.userId!;
  try {
    const userData = await prisma.user.findFirst({
      where: { id },
      select: { id: true, email: true, username: true },
    });
    if (!userData) {
      next(new NotFoundError("User not found"));
    }
    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    next(err);
  }
};

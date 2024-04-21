import { Request, Response, NextFunction } from "express";

import prisma from "../prisma.js";
import { NotFoundError } from "../exceptions/errors.js";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username;

  try {
    const links = await prisma.link.findMany({
      where: { user: { username: username } },
      select: {
        title: true,
        url: true,
      },
    });
    if (links.length == 0) {
      return next(new NotFoundError("Links not found"));
    }

    res.status(200).json({ success: true, data: links });
  } catch (err) {
    next(err);
  }
};

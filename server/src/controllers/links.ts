import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import prisma from "../prisma.js";
import { NotFoundError, UserInputError } from "../exceptions/errors.js";
import { formatZodIssue } from "../utils/zodUtils.js";

const linkBody = z.object({
  title: z.string().min(1),
  url: z.string().url(),
});

export const getLinks = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.userId!;
  try {
    const links = await prisma.link.findMany({ where: { userId: id } });
    res.status(200).json({ success: true, data: links });
  } catch (err) {
    next(err);
  }
};

export const postLink = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId!;

  try {
    const link = linkBody.parse(req.body);
    const createdLink = await prisma.link.create({
      data: { ...link, userId },
    });
    res.status(200).json({ success: true, linkId: createdLink.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

export const updateLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { title, url } = linkBody.parse(req.body);

    const data = await prisma.link.updateMany({ where: { id }, data: { title, url } });
    if (data.count == 0) {
      return next(new NotFoundError("Link does not exist"));
    }

    res.status(200).json({ success: true, updatedId: id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

export const deleteLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = linkBody.extend({ id: z.string() }).parse(req.body);
    await prisma.link.delete({ where: { id } });
    res.status(200).json({ success: true, linkId: id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

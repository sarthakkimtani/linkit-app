import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import prisma from "../prisma.js";
import { UserInputError } from "../exceptions/errors.js";
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
    const { id, title, url } = linkBody.extend({ id: z.string() }).parse(req.body);
    const updatedLink = await prisma.link.update({ where: { id }, data: { title, url } });
    res.status(200).json({ success: true, updatedId: updatedLink.id });
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

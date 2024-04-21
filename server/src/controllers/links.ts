import { Request, Response, NextFunction } from "express";
import { string, z } from "zod";

import prisma from "../prisma.js";
import { UserInputError } from "../exceptions/errors.js";
import { formatZodIssue } from "../utils/zodUtils.js";

const linkBody = z.object({
  title: z.string().min(1),
  url: z.string().url(),
});

const linkSchema = z.array(linkBody);

export const getLinks = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.userId!;
  try {
    const links = await prisma.link.findMany({ where: { userId: id } });
    res.status(200).json({ success: true, data: links });
  } catch (err) {
    next(err);
  }
};

export const postLinks = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId!;

  try {
    const links = linkSchema.parse(req.body);
    const createdLink = await prisma.link.createMany({
      data: links.map((link) => ({ ...link, userId })),
    });
    res.status(200).json({ success: true, count: createdLink.count });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

export const updateLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { linkId, title, url } = linkBody.extend({ linkId: z.string() }).parse(req.body);
    const updatedLink = await prisma.link.update({ where: { id: linkId }, data: { title, url } });
    res.status(200).json({ success: true, updatedId: updatedLink.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

export const deleteLink = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId!;

  try {
    const { url } = linkBody.pick({ url: true }).parse(req.body);
    const deletedLink = await prisma.link.deleteMany({ where: { AND: [{ userId }, { url }] } });
    res.status(200).json({ success: true, count: deletedLink.count });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

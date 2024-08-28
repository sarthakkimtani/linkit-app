import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import prisma from "../prisma.js";
import { NotFoundError, UserInputError } from "../exceptions/errors.js";
import { formatZodIssue } from "../utils/zodUtils.js";

const linkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  order: z.number(),
});

const reorderSchema = z.object({
  id: z.string().min(1),
  order: z.number(),
});

export const getLinks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.userId!;
    const links = await prisma.link.findMany({ where: { userId: id }, orderBy: { order: "asc" } });
    res.status(200).json({ success: true, data: links });
  } catch (err) {
    next(err);
  }
};

export const createLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const link = linkSchema.parse(req.body);
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
    const userId = req.userId!;
    const id = req.params.id;
    const { title, url, order } = linkSchema.parse(req.body);

    const data = await prisma.link.updateMany({
      where: { id, userId },
      data: { title, url, order },
    });
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

export const updateLinksOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const data = z.array(reorderSchema).parse(req.body);

    const results = await prisma.$transaction(async (tx) => {
      return Promise.all(
        data.map((item) =>
          tx.link.update({ where: { id: item.id, userId }, data: { order: item.order } })
        )
      );
    });

    res.status(200).json({ success: true, updateCount: results.length });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

export const deleteLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const id = req.params.id;
    await prisma.link.delete({ where: { id, userId } });
    res.status(200).json({ success: true, linkId: id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new UserInputError(formatZodIssue(err.issues[0])));
    }
    next(err);
  }
};

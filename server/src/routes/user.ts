import { NextFunction, Request, Response, Router } from "express";
import prisma from "../prisma.js";

const userRouter: Router = Router();

userRouter.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

export default userRouter;

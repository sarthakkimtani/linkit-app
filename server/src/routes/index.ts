import { NextFunction, Request, Response, Router } from "express";
import authRouter from "./auth.js";
import { NotFoundError } from "../exceptions/errors.js";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Route not found!"));
});

export default rootRouter;

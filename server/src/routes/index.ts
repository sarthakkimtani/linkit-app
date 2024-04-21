import { NextFunction, Request, Response, Router } from "express";

import authRouter from "./auth.js";
import linksRouter from "./links.js";
import profileRouter from "./profile.js";
import { NotFoundError } from "../exceptions/errors.js";
import { authorizationMiddleware } from "../middlewares/authorization.js";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/links", authorizationMiddleware, linksRouter);
rootRouter.use("/profile", profileRouter);
rootRouter.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(new NotFoundError("Route not found!"))
);

export default rootRouter;

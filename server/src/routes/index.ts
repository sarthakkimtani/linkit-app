import { NextFunction, Request, Response, Router } from "express";

import authRouter from "./auth.js";
import linksRouter from "./links.js";
import profileRouter from "./profile.js";
import userRouter from "./user.js";

import { MethodNotAllowedError } from "../exceptions/errors.js";
import { authorizationMiddleware } from "../middlewares/authorization.js";
import { getMe } from "../controllers/me.js";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/links", authorizationMiddleware, linksRouter);
rootRouter.use("/user", authorizationMiddleware, userRouter);
rootRouter.use("/profile", profileRouter);

rootRouter.get("/me", authorizationMiddleware, getMe);

rootRouter.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(new MethodNotAllowedError("Route not allowed!"))
);

export default rootRouter;

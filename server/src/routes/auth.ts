import { Router } from "express";
import { login, signup } from "../controllers/auth.js";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);

export default authRouter;

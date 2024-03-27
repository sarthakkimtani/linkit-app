import { Router } from "express";
import { login, logout, refresh, signup } from "../controllers/auth.js";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

export default authRouter;

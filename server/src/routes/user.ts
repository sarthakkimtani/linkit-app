import { Router } from "express";

import { updatePassword, updateUser } from "../controllers/user.js";

const userRouter: Router = Router();

userRouter.patch("/:id", updateUser);
userRouter.post("/password/:id", updatePassword);

export default userRouter;

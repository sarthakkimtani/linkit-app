import { Router } from "express";
import { getProfile } from "../controllers/profile.js";

const profileRouter: Router = Router();
profileRouter.get("/:username", getProfile);

export default profileRouter;

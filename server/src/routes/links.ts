import { Router } from "express";

import { getLinks, postLink } from "../controllers/links.js";

const linksRouter: Router = Router();

linksRouter.get("/", getLinks);
linksRouter.post("/", postLink);

export default linksRouter;

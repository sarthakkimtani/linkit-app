import { Router } from "express";

import { deleteLink, getLinks, postLink, updateLink } from "../controllers/links.js";

const linksRouter: Router = Router();

linksRouter.get("/", getLinks);
linksRouter.post("/", postLink);
linksRouter.put("/:id", updateLink);
linksRouter.delete("/", deleteLink);

export default linksRouter;

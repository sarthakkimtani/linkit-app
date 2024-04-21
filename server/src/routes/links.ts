import { Router } from "express";

import { deleteLink, getLinks, postLinks, updateLink } from "../controllers/links.js";

const linksRouter: Router = Router();

linksRouter.get("/", getLinks);
linksRouter.post("/", postLinks);
linksRouter.put("/", updateLink);
linksRouter.delete("/", deleteLink);

export default linksRouter;

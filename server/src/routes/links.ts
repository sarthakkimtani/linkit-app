import { Router } from "express";

import {
  deleteLink,
  getLinks,
  createLink,
  updateLink,
  updateLinksOrder,
} from "../controllers/links.js";

const linksRouter: Router = Router();

linksRouter.get("/", getLinks);
linksRouter.post("/", createLink);
linksRouter.put("/reorder", updateLinksOrder);
linksRouter.put("/:id", updateLink);
linksRouter.delete("/:id", deleteLink);

export default linksRouter;

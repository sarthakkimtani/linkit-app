import express, { Express } from "express";
import dotenv from "dotenv";

import rootRouter from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error-handling.js";
dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();

app.use(express.json());
app.use("/", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}...`);
});

import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import rootRouter from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}...`);
});

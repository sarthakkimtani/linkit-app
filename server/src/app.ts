import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import rootRouter from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();
const corsOptions = {
  origin: process.env.ORIGIN_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("short"));
app.use("/", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}...`);
});

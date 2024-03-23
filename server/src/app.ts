import express, { Express } from "express";

const PORT = 3000;
const app: Express = express();

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}...`);
});

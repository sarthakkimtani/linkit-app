import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient({
  log: ["info", "warn", "error"],
});

export default prisma;

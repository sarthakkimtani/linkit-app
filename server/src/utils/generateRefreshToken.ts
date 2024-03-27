import jwt from "jsonwebtoken";
import crypto from "crypto";

import prisma from "../prisma.js";

export const generateRefreshToken = async (userId: string) => {
  const token = await prisma.token.findFirst({ where: { userId } });
  if (token) {
    await prisma.token.delete({ where: { userId } });
  }

  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "30d",
  });
  const hash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30);

  await prisma.token.create({
    data: {
      userId,
      token: hash,
      expiry: expiry,
    },
  });

  return refreshToken;
};

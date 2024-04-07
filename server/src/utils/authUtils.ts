import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import crypto from "crypto";

import prisma from "../prisma.js";
import { AuthenticationError, UserInputError } from "../exceptions/errors.js";

class AuthUtils {
  async findUser(email: string, username?: string) {
    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    if (user) {
      throw new UserInputError("Username or Account already exists");
    }
  }

  async generatePassword(password: string) {
    return await hash(password, 10);
  }

  async checkPassword(password: string, userPassword: string) {
    const isMatch = await compare(password, userPassword);
    if (!isMatch) {
      throw new AuthenticationError("Incorrect password");
    }
  }

  async generateRefreshToken(userId: string) {
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
  }

  async handleRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new AuthenticationError("Token not found");
    }

    const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const data = await prisma.token.findFirst({ where: { token: tokenHash } });

    if (!data) {
      throw new AuthenticationError("Invalid token");
    }

    if (data.expiry < new Date()) {
      throw new AuthenticationError("Token expired");
    }

    return data;
  }
}

export default AuthUtils;

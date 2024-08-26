import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    async login(_: any, { email, password }: { email: string; password: string }) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && (await compare(password, user.password))) {
        return user;
      }

      throw new Error("Invalid email or password");
    },
  },
};

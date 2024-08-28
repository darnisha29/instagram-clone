import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      // Define the credentials property
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      // Authorize method
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        const isValidPassword = user && await compare(password, user.password);
        if (user && isValidPassword) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.id) {
        session.user = token.id;  
      }
      // console.log("session",session)
      // console.log("token",token)
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
});

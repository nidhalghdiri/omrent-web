import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { AuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "../../../app/libs/prismadb";
var jwt = require("jsonwebtoken");

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user?.hashedPassword) {
          console.error("User not found or invalid password");
          throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          console.error("Incorrect password");
          throw new Error("Invalid Credentials");
        }
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        console.log("User authorized:", user);
        return { ...user, token };
      },
    }),
  ],
  pages: {
    signIn: "/", // Default page for sign-in
    error: "/error", // Default page for errors
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("User:", user);
      // console.log("Account:", account);
      // console.log("Profile:", profile);
      return true; // Allow sign-in
    },
    async redirect({ url, baseUrl }) {
      // Only redirect for non-API routes
      if (url.startsWith(baseUrl) || url.startsWith("/")) {
        return url;
      }
      // Return a JSON object instead of redirecting for API clients
      return "/api/auth/session";
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
      }
      return token;
    },
    // async session({ session, token }) {
    //   if (typeof token.id === "string") {
    //     session.user.id = token.id;
    //   }
    //   if (token.jwt) {
    //     session.jwt = token.jwt;
    //   }
    //   return session;
    // },
    async session({ session, token, user }) {
      // Adding token to the session user
      session.user = {
        ...session.user,
        id: user.id,
        token: (user.token as string) || (token.token as string), // Use token from JWT if available
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default nextAuth(authOptions);

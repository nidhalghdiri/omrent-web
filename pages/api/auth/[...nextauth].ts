import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { AuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "../../../app/libs/prismadb";

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

        console.log("User authorized:", user);
        return user;
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
      console.log("Account:", account);
      console.log("Profile:", profile);
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
    async session({ session, token }) {
      session.user.id = token.id; // Include user ID in the session object
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default nextAuth(authOptions);

// next-auth.d.ts
import { DefaultSession, DefaultUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string; // Add token field to the session user
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    token: string; // Add token field to the User type
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwt?: string; // Add the jwt property to the JWT type
  }
}

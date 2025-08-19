import NextAuth, { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role |null;
    } & DefaultSession["user"];
  }
 interface User extends DefaultUser {
    id: string;
    role: Role|null;
    emailVerified?:Date|null;
  }

}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role |null;
  }
}
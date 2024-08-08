import LoggedInUser from "@/dto/SignIn.dto";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: LoggedInUser;
  }
}

import { NextAuthOptions } from "next-auth";
import LoggedInUser, { ApiResponse, UserData } from "@/dto/SignIn.dto";

import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";
import { login } from "@/server/signIn";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        let user: LoggedInUser | null = null;

        const res = await login({
          userName: credentials.username,
          password: credentials.password,
        });
        if (res.error && res.error.length > 0) {
          res.error.forEach((err: any) => {
            toast.error(`Error ${err.code}: ${err.description}`);
          });
        } else {
          user = {
            id: Date.now().toString(),
            accessToken: res.data?.accessToken as string,
            refreshToken: res.data?.refreshToken as string,
            username: res.data?.username as string,
            userEmail: res.data?.userEmail as string,
            changedPassword: res.data?.changedPassword as string,
            onboard_P: res.data?.onboard_P as string,
            roles: res.data?.roles as string[],
          };
        }
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/singin",
    signOut: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (user) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user, trigger, session }: any) => {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
        return token;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      session.user = token.user;
      return { ...session };
    },
  },
};

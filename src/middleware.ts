import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Pages } from "./constants/constants";

const publicPages: string[] = [Pages.SIGNIN];

const authMiddleware = withAuth(
  // This function is called only if the user is authenticated
  async function onSuccess(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/signin",
      signOut: "/signin",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const isPublicPage = publicPages.includes(req.nextUrl.pathname);

  if (isPublicPage) {
    return NextResponse.next();
  } else {
    return authMiddleware(req as any, {} as any);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

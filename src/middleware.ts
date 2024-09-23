import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Pages } from "./constants/constants";
import { getToken, JWT } from "next-auth/jwt";
import LoggedInUser from "./dto/SignIn.dto";

const publicPages: string[] = [Pages.SIGNIN];
// Define which roles can access each route

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
function clearCookies(req: NextRequest) {
  const response = NextResponse.next();

  // List of cookies to remove (customize based on your cookies)
  const cookiesToClear = ["accessToken", "status"]; // Add your cookie names here

  cookiesToClear.forEach((cookie) => {
    response.cookies.delete(cookie);
  });

  return response;
}

export default async function middleware(req: NextRequest) {
  const isPublicPage = publicPages.includes(req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/signin") {
    return clearCookies(req);
  }
  if (isPublicPage) {
    return NextResponse.next();
  } else {
    return authMiddleware(req as any, {} as any);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

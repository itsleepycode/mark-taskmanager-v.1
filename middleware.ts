import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const loginPage = "/login";
  const homePage = "/";
  const url = req.nextUrl.pathname;

  if (isAuthenticated && url === loginPage) {
    return NextResponse.redirect(new URL(homePage, req.url));
  }

  if (!isAuthenticated && url !== loginPage) {
    return NextResponse.redirect(new URL(loginPage, req.url));
  }
}

export const config = {
  matcher: ["/", "/components/:path*"],
};

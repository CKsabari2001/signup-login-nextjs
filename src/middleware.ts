import { NextResponse, NextRequest } from "next/server";

export function validateChangePasswordToken(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path !== "/forgetPassword/changePassword") {
    return true;
  }

  // taking token from the url to verify that token
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  // if no user return false to redirect to login page
  if (!token) {
    return false;
  }

  return true;
}

export function middleware(request: NextRequest) {
  // if (!validateChangePasswordToken(request)) {
  //   return NextResponse.redirect(
  //     new URL("/forgetPassword/confirmEmail", request.url)
  //   );
  // }

  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgetPassword/confirmEmail" ||
    path === "/forgetPassword/changePassword";

  // const token = request.cookies.get("tokens")?.value || "";

  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/profile", request.url));
  // }

  // if (path === "/") {
  //   return NextResponse.redirect(new URL("/profile", request.url));
  // }

  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyEmail",
    "/forgetPassword/changePassword",
    "/forgetPassword/confirmEmail",
  ],
};

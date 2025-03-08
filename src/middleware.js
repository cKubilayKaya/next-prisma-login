import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isAuthPage = path === "/auth/login" || path === "/auth/register";
  const homepageUrl = new URL("/", request.url);
  const loginUrl = new URL("/auth/login", request.url);

  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (!isAuthPage) {
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    await jwtVerify(token, secretKey);

    if (isAuthPage) {
      return NextResponse.redirect(homepageUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware hatası:", error);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

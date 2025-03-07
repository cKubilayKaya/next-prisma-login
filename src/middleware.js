import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isAuthPage = path === "/auth/login" || path === "/auth/register";
  const homepageUrl = new URL("/", request.url);
  const loginUrl = new URL("/auth/login", request.url);

  try {
    // Cookie'den token'ı al
    const token = request.cookies.get("token")?.value;

    // Token kontrolü
    if (!token) {
      // Token yoksa ve auth sayfası değilse, login'e yönlendir
      if (!isAuthPage) {
        return NextResponse.redirect(loginUrl);
      }
      // Token yok ama zaten auth sayfasındaysa, devam et
      return NextResponse.next();
    }

    // Token varsa doğrula
    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      await jwtVerify(token, secretKey);

      // Token geçerli - eğer auth sayfalarına erişmeye çalışıyorsa anasayfaya yönlendir
      if (isAuthPage) {
        return NextResponse.redirect(homepageUrl);
      }

      // Korumalı sayfalara erişimde sorun yok, devam et
      return NextResponse.next();
    } catch (verifyError) {
      // Token geçersiz
      console.error("Token doğrulama hatası:", verifyError);

      // Auth sayfalarına erişim serbest, diğer sayfalarda login'e yönlendir
      if (!isAuthPage) {
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Middleware hatası:", error);
    return NextResponse.redirect(loginUrl);
  }
}

// Tüm sayfaları kontrol et, ancak statik dosyaları hariç tut
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

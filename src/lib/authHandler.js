import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

export async function authHandler(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return {
        user: null,
        response: NextResponse.json({ error: "Giriş yapmadınız." }, { status: 401 }),
      };
    }

    // Token doğrulama
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.error("Token doğrulama hatası:", error);
      return {
        user: null,
        response: NextResponse.json({ error: "Geçersiz veya süresi dolmuş token." }, { status: 401 }),
      };
    }

    const { email } = decoded;

    // Kullanıcıyı veritabanında bul
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        user: null,
        response: NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 }),
      };
    }

    // Başarılı durumda kullanıcı bilgisini döndür
    return {
      user,
      response: null,
    };
  } catch (error) {
    console.error("Kimlik doğrulama hatası:", error);
    return {
      user: null,
      response: NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 }),
    };
  }
}

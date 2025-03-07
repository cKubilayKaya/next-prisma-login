import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";
import userSchema from "@/validations/userSchema";

export async function POST(req) {
  try {
    const { email, userName, password } = await req.json();

    // Kullanıcıdan gelen veriyi validasyon işlemi
    const { error } = userSchema.validate({ email, userName, password });

    if (error) {
      return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

    // email veya userName'den birinin var olup olmadığını kontrol et
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { userName }],
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    // Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Geçersiz şifre." }, { status: 400 });
    }

    // JWT oluştur
    const token = jwt.sign(
      { email: user.email, userName: user.userName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" } // Token 1 saat sonra geçersiz olur
    );

    // Token ile birlikte yanıt dön
    const response = NextResponse.json({ message: "Giriş başarılı.", user });
    response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`);

    return response;
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

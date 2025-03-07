import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";
import userSchema from "@/validations/userSchema";

export async function POST(req) {
  const date = new Date();
  date.setTime(date.getTime() + 3 * 60 * 60 * 1000); // 3 saat ekle
  const expiryDate = new Date(date.getTime() + 3600 * 1000); // 1 saat daha ekle (çerez süresi)

  try {
    const { email, password } = await req.json();

    const { error } = userSchema.validate({ email, password });

    if (error) {
      return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Geçersiz şifre." }, { status: 400 });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRES } // Token 1 saat sonra geçersiz olur
    );

    const response = NextResponse.json({ message: "Giriş başarılı.", status: 201 });

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Expires=${expiryDate.toUTCString()}; SameSite=Lax; ${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
    );

    return response;
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

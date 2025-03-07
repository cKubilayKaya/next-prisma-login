import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";
import userSchema from "@/validations/userSchema";

export async function POST(req) {
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
      { expiresIn: "1h" } // Token 1 saat sonra geçersiz olur
    );

    const response = NextResponse.json({ message: "Giriş başarılı.", status: 201 });
    response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`);

    return response;
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

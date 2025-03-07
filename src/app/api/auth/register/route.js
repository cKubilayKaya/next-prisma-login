import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import userSchema from "@/validations/userSchema";

export async function POST(req) {
  try {
    const { fullName = "", userName, email, password } = await req.json();

    const { error } = userSchema.validate({ fullName, userName, email, password });

    if (error) {
      return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

    if (!userName || !email || !password) {
      return NextResponse.json({ error: "Kullanıcı adı, e-posta ve şifre gereklidir." }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { userName }] },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Bu kullanıcı adı veya e-posta zaten kullanılıyor." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        userName,
        email,
        password: hashedPassword,
      },
    });

    // JWT oluştur
    const token = jwt.sign(
      { userId: newUser.id, userName: newUser.userName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" } // Token 1 saat sonra geçersiz olur
    );

    // Token ile birlikte yanıt dön
    return NextResponse.json({ message: "Kullanıcı başarıyla oluşturuldu.", user: newUser, token }, { status: 201 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

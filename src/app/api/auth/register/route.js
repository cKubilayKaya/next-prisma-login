import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import registerSchema from "@/validations/server/auth/registerSchema";

export async function POST(req) {
  try {
    const { fullName, userName, email, password } = await req.json();

    const { error } = registerSchema.validate({ fullName, userName, email, password });

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
      select: {
        fullName: true,
        userName: true,
        email: true,
      },
    });

    return NextResponse.json({ message: "Kullanıcı başarıyla oluşturuldu.", user: newUser, status: 201 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

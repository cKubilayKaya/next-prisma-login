import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import profileSchema from "@/validations/server/auth/profileSchema";

export async function PUT(req) {
  try {
    const data = await req.json();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Giriş yapmadınız." }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { email } = decoded;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    const { error } = profileSchema.validate({ email: data?.email, fullName: data?.fullName, userName: data?.userName, password: data?.password });
    if (error) {
      return NextResponse.json({ error: error?.details?.[0]?.message }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        email: data?.email,
        fullName: data?.fullName,
        userName: data?.userName,
      },
    });

    const { id, password, ...userData } = updatedUser;

    return NextResponse.json({ data: { ...userData }, status: 201 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

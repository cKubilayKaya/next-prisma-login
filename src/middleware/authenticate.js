import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authenticate(req) {
  try {
    const token = req.cookies.token; // Cookie'den token'ı alıyoruz

    if (!token) {
      return NextResponse.json({ error: "Token bulunamadı. Lütfen giriş yapın." }, { status: 401 });
    }

    // Token'ı doğrula
    jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Token geçerli, işlemi devam ettir
    return NextResponse.next(); // Devam et
  } catch (error) {
    return NextResponse.json({ error: "Geçersiz token." }, { status: 401 });
  }
}

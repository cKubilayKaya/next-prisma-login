import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Token'ı temizlemek için Set-Cookie başlığını kullanıyoruz
    const response = NextResponse.json({ message: "Çıkış yapıldı." });

    // Cookie'deki token'ı sil
    response.headers.set("Set-Cookie", "token=; HttpOnly; Secure; Path=/; Max-Age=0");

    return response;
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

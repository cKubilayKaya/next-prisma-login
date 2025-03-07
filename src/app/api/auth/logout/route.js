import { NextResponse } from "next/server"; // Doğru import

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Çıkış yapıldı.", status: 201 });

    response.headers.set("Set-Cookie", "token=; HttpOnly; Secure; Path=/; Max-Age=0");

    return response;
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu.", status: 500 });
  }
}

import { NextResponse } from "next/server";
import { authHandler } from "@/lib/authHandler";

export async function GET(req) {
  try {
    const { user, response } = await authHandler(req);

    if (response) {
      return response;
    }

    const { id, password, ...userData } = user;

    return NextResponse.json({ data: { ...userData }, status: 201 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

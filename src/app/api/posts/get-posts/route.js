import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authHandler } from "@/lib/authHandler";

export async function GET(req) {
  try {
    const { response } = await authHandler(req);

    if (response) {
      return response;
    }

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            fullName: true,
            userName: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, posts, status: 200 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

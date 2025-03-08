// /src/app/api/posts/get-post/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authHandler } from "@/lib/authHandler";
import getPostSchema from "@/validations/server/posts/getPostSchema";

export async function POST(req) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug parametresi eksik." }, { status: 400 });
    }

    const { response } = await authHandler(req);

    if (response) {
      return response;
    }

    const { error } = getPostSchema.validate({ slug });
    if (error) {
      return NextResponse.json({ error: error?.details?.[0]?.message }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        author: {
          select: {
            fullName: true,
            userName: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      console.log("Post bulunamadı");
      return NextResponse.json({ error: "Post bulunamadı." }, { status: 404 });
    }

    console.log("Post bulundu:", post);
    return NextResponse.json({ success: true, post, status: 200 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu.", message: error.message }, { status: 500 });
  }
}

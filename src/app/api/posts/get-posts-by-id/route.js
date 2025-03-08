import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authHandler } from "@/lib/authHandler";
import getPostByIdSchema from "@/validations/server/posts/getPostByIdSchema";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // email parametresi kontrolü
    if (!email) {
      return NextResponse.json({ error: "Email parametresi eksik." }, { status: 400 });
    }

    const { response } = await authHandler(req);

    if (response) {
      return response; // Yetkilendirme başarısız olduysa hata yanıtını döndür
    }

    // Kullanıcıyı email ile prisma'dan bulalım
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    // ID'yi authorId olarak alalım
    const authorId = user.id;

    // getPostByIdSchema ile validasyon
    const { error } = getPostByIdSchema.validate({ email });
    if (error) {
      return NextResponse.json({ error: error?.details?.[0]?.message }, { status: 400 });
    }

    // Kullanıcıya ait postları sorgulayalım
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
    });

    if (posts.length === 0) {
      console.log("Yazarın hiçbir postu bulunamadı.");
      return NextResponse.json({ error: "Yazarın hiçbir postu bulunamadı." }, { status: 404 });
    }

    console.log("Yazarın postları bulundu:", posts);
    return NextResponse.json({ success: true, posts, status: 200 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu.", message: error.message }, { status: 500 });
  }
}

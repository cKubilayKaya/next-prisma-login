import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authHandler } from "@/lib/authHandler";
import addPostSchema from "@/validations/server/posts/addPostSchema";

export async function POST(req) {
  try {
    const { title, content, slug, imageUrl } = await req.json();

    // Kullanıcı kimlik doğrulaması
    const { user, response } = await authHandler(req);

    if (response) {
      return response; // Yetkilendirme başarısız olduysa hata yanıtını döndür
    }

    // Slug'un benzersizliğini kontrol et
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json({ error: "Bu slug zaten alınmış." }, { status: 400 });
    }

    // İstek gövdesinden verileri al
    const { error } = addPostSchema.validate({ title, content, slug });

    if (error) {
      return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        imageUrl: imageUrl || undefined,
        authorId: user.id,
      },
    });

    return NextResponse.json({ success: true, post: newPost, status: 200 });
  } catch (error) {
    console.error("Post oluşturma hatası:", error);
    return NextResponse.json({ error: "Post oluşturulurken bir hata oluştu." }, { status: 500 });
  }
}

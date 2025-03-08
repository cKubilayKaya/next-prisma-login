"use client";
import { getPostRequest } from "@/services/posts/postService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const slug = params.slug;

  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const res = await getPostRequest({ slug });
      if (res?.success === true && res?.status === 200) {
        setPost(res?.post);
      }
    };
    getPost();
  }, []);

  if (post?.slug) {
    return (
      <div className="container mx-auto mt-16">
        <h3 className="text-white text-3xl">{post?.title}</h3>
        <p className="text-white">{post?.content}</p>

        <div className="mt-16 border-t border-t-gray-700">
          <p className="text-white mt-8">{post?.author?.fullName}</p>
          <p className="text-sm text-gray-400">{post?.author?.userName}</p>
        </div>
      </div>
    );
  }
}

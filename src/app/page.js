"use client";
import { getPostsRequest } from "@/services/posts/postService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await getPostsRequest();

      if (res?.success === true && res?.status === 200) {
        setPosts(res?.posts);
      }
    };
    getPosts();
  }, []);

  console.log(posts);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto flex flex-col gap-8 row-start-2  sm:items-start">
        <h3 className="text-3xl font-semibold mb-12">Posts</h3>
        <div className="posts-container w-full">
          {posts?.map((post) => (
            <div className="border border-gray-700 p-8 rounded w-full mb-8" key={post?.id}>
              <Link href={`/${post?.id}`} className="text-xl mb-4">
                {post?.title}
              </Link>
              <p className="w-3/4">{post?.content}</p>
              <div className="mt-12">
                <img src="/" alt="" />
                <div>
                  <p className="font-bold">{post?.author?.fullName}</p>
                  <p className="font-light text-sm border-gray-900">{post?.author?.userName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

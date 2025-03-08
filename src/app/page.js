"use client";
import { AddPostModal } from "@/components/Posts/AddPostModal";
import { getPostsRequest } from "@/services/posts/postService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addPost, setAddPost] = useState({
    slug: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    const getPosts = async () => {
      const res = await getPostsRequest();
      if (res?.success === true && res?.status === 200) {
        setPosts(res?.posts);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto flex flex-col gap-8 row-start-2  sm:items-start">
        <div className="flex items-center justify-between w-full mb-12">
          <h3 className="text-3xl font-semibold text-white">Posts</h3>
          <AddPostModal addPost={addPost} setAddPost={setAddPost} showModal={showModal} setShowModal={setShowModal} setPosts={setPosts} />
        </div>
        <div className="posts-container w-full grid grid-cols-2 gap-10">
          {posts?.map((post) => (
            <div className="border border-gray-700 p-8 rounded w-full" key={post?.id}>
              <Link href={`/post/${post?.slug}`} className="text-xl mb-4 text-white">
                {post?.title}
              </Link>
              <p className="w-3/4 text-white">{post?.content}</p>
              <div className="mt-12">
                <img src="/" alt="" />
                <div>
                  <p className="font-bold text-white">{post?.author?.fullName}</p>
                  <p className="font-light text-sm text-gray-300">{post?.author?.userName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

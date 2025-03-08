import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSlug } from "@/lib/createSlug";
import { addPostRequest, getPostsRequest } from "@/services/posts/postService";

export function AddPostModal({ addPost, setAddPost, showModal, setShowModal, setPosts }) {
  const getPosts = async () => {
    const res = await getPostsRequest();
    if (res?.success === true && res?.status === 200) {
      setPosts(res?.posts);
      setShowModal(false);
    }
  };
  const addPostHandler = async () => {
    const res = await addPostRequest(addPost);
    if (res?.success === true && res?.status === 200) {
      await getPosts();
    }
  };
  return (
    <Dialog open={showModal}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setShowModal(true)}>
          Add Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="slug" className="text-right">
              Slug
            </Label>
            <Input id="slug" value={addPost?.slug} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={addPost?.title}
              className="col-span-3"
              onChange={(e) => setAddPost({ ...addPost, title: e?.target.value, slug: createSlug(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Input id="content" value={addPost?.content} className="col-span-3" onChange={(e) => setAddPost({ ...addPost, content: e?.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={addPostHandler}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

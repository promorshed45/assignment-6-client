"use client";
import PostCreationModal from "./_components/CreatePost";

import { useUser } from "@/src/providers/user.provider";

const CreatePost = () => {
  const { user } = useUser();

  console.log("create post from user id", user);

  return (
    <div>
      <PostCreationModal userInfo={user} />
    </div>
  );
};

export default CreatePost;

'use client'
import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowBigDownIcon, ArrowBigUp, MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";

import CommentBox from "./CommentBox";

import ReusableForm from "@/src/components/ui/ReusableForm";
import { usePostComment } from "@/src/hooks/comments/comments.hook";
import ReusableTextarea from "@/src/components/ui/ReusableTextarea";

interface FormData {
  comment: string;
}

const CardActions = ({ currentUser, post, comment }: any) => {

  const {reset} = useForm<FormData>();
  const [isClickToComment, setIsClickToComment] = useState(false);
  const { mutate: handlePostComment } = usePostComment();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const commentData = {
      postId: post?._id,
      authorId: currentUser?._id,
      content: data.comment,
    };
    // console.log("commentData", commentData);
    handlePostComment(commentData);
    reset();
    setIsClickToComment(false);
    router.push(`/posts/${post._id}`);
  };

  return (
    <>
      
      <div className="md:flex space-y-3 justify-between">
        <div className="flex gap-3 items-center border-2 border-gray-600 px-3 rounded-md">
          <div className="hover:bg-green-500/20 rounded-md px-3 py-2">
            <Tooltip content={<div className="text-sm font-bold">Upvotes</div>}>
              <button className="flex items-center gap-2">
                <ArrowBigUp className="size-5 text-green-600" />
                {/* {upvoteCount} */}
                00
              </button>
            </Tooltip>
          </div>
          <div className="border-r border-gray-200" />
          <div className="hover:bg-red-500/20 rounded-md px-3 py-2">
            <Tooltip
              content={<div className="text-sm font-bold">Downvotes</div>}
            >
              <button className="flex items-center gap-2">
                <ArrowBigDownIcon className="size-5 text-red-600" />
                {/* {downvoteCount} */}
                00
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="flex-1 text-[16px]"
            size="sm"
            variant="flat"
            onClick={() => setIsClickToComment(!isClickToComment)}
          >
            <span className="text-xl">
              <MessageCircleMore />
            </span>{" "}
            <span>Comment</span>
          </Button>
        </div>
      </div>

      <CommentBox comment={comment} currentUser={currentUser} />

      {isClickToComment && (
        currentUser ? (
          <div className="md:p-5">
            <ReusableForm onSubmit={onSubmit}>
              <ReusableTextarea label="Comment" name="comment" rows={2} type="text" />
              <Button className="w-full mt-4" type="submit">
                Submit
              </Button>
            </ReusableForm>
          </div>
        ) : (
          <div className="text-center mb-4">
            <p>Please Login to comment</p>
          </div>
        )
      )}
    </>
  );
};

export default CardActions;

"use client";
import React, { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { SubmitHandler, FieldValues } from "react-hook-form";
import ReusableForm from "@/src/components/ui/ReusableForm";
import ReusableInput from "@/src/components/ui/ReusableInput";
import { ArrowBigDownIcon, ArrowBigUp, MessageCirclePlus } from "lucide-react";
import { usePostComment } from "@/src/hooks/post/post.hook";

interface Comment {
  author: string;
  text: string;
}

interface Post {
  upvote: number;
  downvote: number;
  comments: Comment[];
}

interface FormData {
  comment: string; // corrected field name
}

const CardActions = ({post}: any) => {
  const [isClickToComment, setIsClickToComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const {mutate: handlePostComment} = usePostComment()

  // handle comment submit
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const commentData = {
        postId: post._id,
        authorId: post?.user?._id,
        content: data.comment,
    }
    handlePostComment(commentData);
    console.log(commentData);
    setShowComment(true); 
  };

  return (
    <div>
      <div className="mt-4 flex justify-between">
        <div className="flex gap-3 items-center border-2 border-gray-600 px-3 rounded-md">
          <div className="hover:bg-green-500/20 rounded-md px-3 py-2">
            <Tooltip content={<div className="text-sm font-bold">Upvotes</div>}>
              <button className="flex items-center gap-2">
                <ArrowBigUp className="size-5 text-green-600" />
                {/* {upvoteCount} */}
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
            <MessageCirclePlus />
            </span>{" "}
            <span>Comment</span>
          </Button>
        </div>
      </div>

      {showComment ? "comment box" : ""}
      {/* handle comment */}
      {isClickToComment && (
        <div className="p-5">
          <ReusableForm onSubmit={onSubmit}>
            <ReusableInput label="Comment" name="comment" type="text" />
            <Button className="w-full mt-4" type="submit">
              Submit
            </Button>
          </ReusableForm>
        </div>
      )}
    </div>
  );
};

export default CardActions;

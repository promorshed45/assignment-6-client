"use client";
import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ArrowBigDownIcon,
  ArrowBigUp,
  Download,
  MessageCircleMore,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";

import CommentBox from "./CommentBox";

import ReusableForm from "@/src/components/ui/ReusableForm";
import { usePostComment } from "@/src/hooks/comments/comments.hook";
import ReusableTextarea from "@/src/components/ui/ReusableTextarea";
import { TPost } from "@/src/types";
import Link from "next/link";

interface FormData {
  comment: string;
}

interface CardActionsProps {
  currentUser: any;
  post: TPost;
  comment: any;
}

const CardActions: React.FC<CardActionsProps> = ({
  currentUser,
  post,
  comment,
}) => {
  const { reset } = useForm<FormData>();
  const [isClickToComment, setIsClickToComment] = useState(false);
  const { mutate: handlePostComment, isLoading: isCommenting } =
    usePostComment();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const commentData = {
      postId: post?._id,
      authorId: currentUser?._id,
      content: data.comment,
    };

    handlePostComment(commentData);
    reset();
    setIsClickToComment(false);
    router.push(`/posts/${post._id}`);
  };

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "a4",
    });

    const margin = 1;
    const pageWidth = 8.27;

    let yPosition = margin;
    doc.setTextColor("green");
    doc.setFont("helvetica", "normal");

    doc.setTextColor("black");
    doc.text(`Author Name: ${post.user.name}`, margin, yPosition);
    yPosition += 0.5;

    doc.setTextColor("blue");
    doc.setFont("helvetica", "normal");
    doc.text(`Post Title: ${post.title}`, margin, yPosition);
    yPosition += 0.5;

    doc.setTextColor("black");
    doc.setFont("helvetica", "normal", "12");
    doc.text(`Post Description: ${post.description}`, margin, yPosition, {
      maxWidth: pageWidth - 2 * margin,
    });
    yPosition += 0.5;

    doc.setTextColor("gray");
    doc.setFont("helvetica", "normal");
    yPosition += 1.2;
    doc.text(`Post Category: ${post.category}`, margin, yPosition);

    // Add an image
    if (post.images) {
      post.images.map((imgData) => {
        yPosition += 0.5;
        doc.addImage(imgData, "JPEG", margin + 1, yPosition - 0.2, 3, 2.5);
        yPosition += 1.5;
      });
    }

    doc.save(`${post.title}.pdf`);
  };

  return (
    <>
      <div className="md:flex justify-between items-center">
        <div className="flex items-center border ml-3 border-gray-200 dark:border-gray-700 rounded-md justify-between">
          <div className="hover:bg-green-500/20 rounded-md px-3 py-2">
            <Tooltip content={<div className="text-sm font-bold">Upvotes</div>}>
              <button className="flex items-center gap-2">
                <ArrowBigUp className="size-5 text-green-600" />
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
                00
              </button>
            </Tooltip>
          </div>
        </div>
        
        <div className="flex gap-2 pt-3 md:pt-0 justify-between w-full md:w-1/2">
          <div className="bg-blue-500/20 rounded-md px-3 py-2">
            <Tooltip
              content={<div className="text-sm font-bold">Download</div>}
            >
              <button
                className="flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download className="size-5 text-blue-700" />
              </button>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2 bg-violet-500/20 px-3 py-1.5 rounded-md">
          <button
            className="flex gap-2 text-[16px] text-violet-700 hover:text-white/70"
            onClick={() => setIsClickToComment((prev) => !prev)}
          >
            <span className="text-xl">
              <MessageCircleMore />
            </span>{" "}
            <span>Comment</span>
          </button>
        </div>
        </div>
      </div>

      <CommentBox comment={comment} currentUser={currentUser} />

      {isClickToComment &&
        (currentUser ? (
          <div className="md:p-5">
            <ReusableForm onSubmit={onSubmit}>
              <ReusableTextarea label="Comment" name="comment" rows={2} />
              <Button
                className="w-full mt-4"
                disabled={isCommenting}
                type="submit"
              >
                {isCommenting ? "Submitting..." : "Submit"}
              </Button>
            </ReusableForm>
          </div>
        ) : (
          <div className="text-center mb-4">
            <Link href="/login"><p>Please Login to comment</p></Link>
          </div>
        ))}
    </>
  );
};

export default CardActions;

"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

import {
  useDeleteComment,
  useUpdateComment,
} from "@/src/hooks/comments/comments.hook";
import { IUser } from "@/src/types";

const CommentBox = ({
  currentUser,
  comment,
}: {
  currentUser: IUser;
  comment: any;
}) => {
  const { mutate: handleDeleteComment } = useDeleteComment();
  const { mutate: handleCommentUpdate } = useUpdateComment();

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [newContent, setNewContent] = useState<string>("");

  const handleUpdateComment = (id: string) => {
    if (newContent.trim() !== "") {
      handleCommentUpdate({
        commentId: id,
        commentData: { content: newContent },
      });
      setEditingCommentId(null);
      setNewContent("");
    } else {
      alert("Comment cannot be empty.");
    }
  };

  const handleSubmit = (id: string) => {
    handleDeleteComment({ commentId: id });
  };

  return (
    <div className="px-4 py-5 mt-5">
      {comment?.data?.length === 0 ? (
        <div className="px-4 py-5 mt-5 bg-blue-500/10 shadow-lg rounded-lg">
          <p className="text-gray-500 text-center">No comments available.</p>
        </div>
      ) : (
        comment?.data?.map((item: any) => (
          <div
            key={item._id}
            className="pb-4 px-4 py-5 mb-5 flex items-start justify-between w-full bg-blue-500/10 transition-all duration-200 rounded-md"
          >
            <div className="flex gap-3 w-[95%] items-start">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={item?.authorId?.profilePhoto}
              />
              <div className="flex flex-col gap-1 items-start justify-center pr-4 bg-gray-50 rounded-xl p-3 shadow-sm">
                <h4 className="text-base font-semibold leading-tight text-gray-800">
                  {item?.authorId?.name}
                </h4>
                {editingCommentId === item._id ? (
                  <div className="flex items-center">
                    <Input
                      fullWidth
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                    />
                    <Button
                      className="ml-2"
                      color="success"
                      variant="flat"
                      onClick={() => handleUpdateComment(item?._id)}
                    >
                      Update
                    </Button>
                  </div>
                ) : (
                  <h5 className="text-sm text-gray-600">{item?.content}</h5>
                )}
              </div>
            </div>

            {currentUser && currentUser._id === item?.authorId?._id ? (
              <div className="w-[5%] mr-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly variant="light">
                      <EllipsisVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Comment Actions">
                    <DropdownItem
                      key="edit"
                      color="success"
                      variant="flat"
                      onClick={() => {
                        setEditingCommentId(item._id);
                        setNewContent(item.content); // Set the current content for editing
                      }}
                    >
                      Edit Comment
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      color="danger"
                      variant="flat"
                      onClick={() => handleSubmit(item._id)}
                    >
                      Delete Comment
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentBox;

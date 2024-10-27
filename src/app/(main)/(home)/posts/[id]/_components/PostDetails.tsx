"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";

import CardActions from "../../_components/CardActions";

import UpdateMyPostModal from "./UpdateMyPostModal";
import DeletePostModal from "./DeletePostModal";

import { timeAgo } from "@/src/utilis/timeFormat";
import { useUser } from "@/src/providers/user.provider";

const PostDetails = ({ data, comment }: any) => {
  const { user: currentUser } = useUser();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    title = "Untitled Post",
    description = "No description available.",
    images = [],
    user = {},
    createdAt,
  } = data || {};

  const postDate = createdAt ? timeAgo(createdAt) : "";
  const userPhoto = user?.profilePhoto || "https://nextui.org/avatars/avatar-1.png";

  const handleUpdateModalOpen = () => {
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-6 md:py-10"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg md:p-5">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={userPhoto} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-800">
                {user?.name || "Unknown User"}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {postDate}
              </h5>
            </div>
          </div>

          {currentUser && user?.email === currentUser?.email ? (
            <Dropdown backdrop="blur" placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="bg-default-50 hover:bg-default-100"
                  startContent={<EllipsisVertical size={18} />}
                  variant="bordered"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="space-y-3" variant="faded">
                <DropdownItem key="update"  onClick={handleUpdateModalOpen}>
                  <div className="flex items-center gap-4">
                  <Pencil className="size-4"/> Update Post
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="flex gap-2 text-danger"
                  color="danger"
                  onClick={handleDeleteModalOpen}
                >
                  <div className="flex items-center gap-4"> 
                 <Trash className="size-4"/> Delete Post
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              className={
                isFollowed
                  ? "bg-transparent text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </CardHeader>
        <CardBody className="px-4">
          <h2 className="text-xl md:text-2xl font-bold md:my-4">{title}</h2>
          <p className="text-base md:text-lg text-gray-500 mb-4">
            {description}
          </p>
          <div className="mx-auto">
            {images.length ? (
              <div className="flex-cols md:flex gap-6 justify-center">
                {images.length > 1 ? (
                  images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-5 py-2 md:py-0 justify-center items-center md:w-1/2 "
                    >
                      <Image
                        alt={`Post image ${index + 1}`}
                        className="flex rounded-lg w-full h-56 object-cover"
                        height={400}
                        src={image}
                        width={700}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center w-full">
                    <Image
                      alt="Post image 1"
                      className="rounded-lg w-96 h-56 object-cover"
                      height={400}
                      src={images[0]}
                      width={700}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>
        </CardBody>
        <div className="p-4 md:p-10">
          <CardActions
            comment={comment}
            currentUser={currentUser}
            post={data}
          />
        </div>
      </Card>

      <UpdateMyPostModal
        id={data?._id}
        isOpen={isUpdateModalOpen}
        post={data}
        onClose={handleUpdateModalClose}
      />
      
      <DeletePostModal
        isOpen={isDeleteModalOpen}
        postId={data?._id} // Pass the post ID to the delete modal for handling
        onClose={handleDeleteModalClose}
      />
    </motion.div>
  );
};

export default PostDetails;

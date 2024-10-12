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
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import CardActions from "../../_components/CardActions";

import UpdateMyPostModal from "./UpdateMyPostModal";

import { timeAgo } from "@/src/utilis/timeFormat";
import { useUser } from "@/src/providers/user.provider";
import { useDeletePost } from "@/src/hooks/post/post.hook";

const PostDetails = ({ data, comment }: any) => {
  const { mutate: handleDeletePost, isLoading, isSuccess } = useDeletePost();
  const { user: currentUser } = useUser();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    title = "Untitled Post",
    description = "No description available.",
    images = [],
    user = {},
    createdAt,
  } = data || {};

  const postDate = createdAt ? timeAgo(createdAt) : "";
  const userPhoto =
    user?.profilePhoto || "https://nextui.org/avatars/avatar-1.png";

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (id: string) => {
    console.log(id);
    handleDeletePost({ postId: id });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      router.push("/posts");
    }
  }, [isLoading, isSuccess]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-10"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
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
              <DropdownMenu aria-label="Static Actions" variant="faded">
                <DropdownItem key="new" onClick={handleModalOpen}>
                  Update Post
                </DropdownItem>

                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => handleSubmit(data?._id)}
                >
                  Delete Post
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
          <h2 className="text-2xl font-bold my-4">{title}</h2>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <div className="grid grid-cols-2 gap-4 mx-auto">
            {images.length ? (
              images.map((image: string, index: number) => (
                <div key={index} className="flex justify-center items-center">
                  <Image
                    alt={`Post image ${index + 1}`}
                    className="rounded-lg h-56 object-cover"
                    height={400}
                    src={image}
                    width={700}
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </CardBody>
        <div className="p-10">
          <CardActions comment={comment} currentUser={currentUser} post={data} />
        </div>
      </Card>

      <UpdateMyPostModal
        id={data?._id}
        isOpen={isModalOpen}
        post={data}
        onClose={handleModalClose}
      />
    </motion.div>
  );
};

export default PostDetails;

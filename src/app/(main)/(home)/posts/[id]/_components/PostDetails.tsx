"use client";
import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import CardActions from "../../_components/CardActions";

import UpdateMyPostModal from "./UpdateMyPostModal";

import { timeAgo } from "@/src/utilis/timeFormat";
import { useUser } from "@/src/providers/user.provider";

const PostDetails = ({ data, comment }: any) => {
  const { user: currentUser } = useUser();
  const [isFollowed, setIsFollowed] = useState(false);

  const { title, description, images, user, createdAt } = data;
  const postDate = timeAgo(createdAt);
  const userPhoto =
    user.profilePhoto || "https://nextui.org/avatars/avatar-1.png";

  // console.log("cu", currentUser?.email, "useremail", user.email);

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
                {user.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {postDate}
              </h5>
            </div>
          </div>

          {currentUser && user?.email === currentUser?.email ? ( // Corrected the syntax for conditional rendering
            <>
              {/* Your logged-in user UI goes here */}
              <UpdateMyPostModal post={data} />
            </>
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
              onPress={() => {
                setIsFollowed(!isFollowed);
              }}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </CardHeader>
        <CardBody className="px-4">
          <h2 className="text-2xl font-bold my-4">{title}</h2>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <div className="grid grid-cols-2 gap-4 mx-auto">
            {images.map((image: any, index: any) => (
              <div  key={index} className="flex justify-center items-center">
                <Image
                  alt={`Post image ${index + 1}`}
                  className="rounded-lg h-56 object-cover"
                  height={400}
                  src={image}
                  width={700}
                />
              </div>
            ))}
          </div>
        </CardBody>
        {/* icons */}
        <div className="p-10">
          <CardActions comment={comment} post={data} />
        </div>
      </Card>
    </motion.div>
  );
};

export default PostDetails;

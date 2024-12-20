"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

import CardActions from "./CardActions";

import { timeAgo } from "@/src/utilis/timeFormat";
import { useUser } from "@/src/providers/user.provider";
import { useUpdateUser } from "@/src/hooks/user/users.hook";

const PostCard = ({ post }: any) => {
  const { mutate: handleFollowUser } = useUpdateUser()
  const { user: currentUser } = useUser();

  // console.log("user post card", currentUser);

  const [isFollowed, setIsFollowed] = useState(false);
  const { _id, title, description, images, user, category, createdAt } = post;
  const userPhoto = user?.profilePhoto || "https://nextui.org/avatars/avatar-1.png";
  const postDate = createdAt ? timeAgo(createdAt) : "";

  const handleSubmit = () => {
    const userId = post?.user?._id;
    const followerId = currentUser?._id;

    const userData = {
      flowerStatus: {
        followerId
      }
    }
    handleFollowUser({ userId, userData });
  }



  return (
    <div className="w-full">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto rounded-lg">
          <Link className="block" href={`/posts/${_id}`}>
            <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
              <Card className="overflow-hidden w-full md:w-2/3 bg-transparent shadow-none rounded-none">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Tooltip
                      className="p-2"
                      content={
                        <div className="">
                          <Card className="max-w-[340px] shadow-none rounded-none bg-transparent">
                            <CardHeader className="justify-between">
                              <div className="flex gap-5">
                                <Avatar
                                  isBordered
                                  radius="full"
                                  size="md"
                                  src={userPhoto}
                                />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                  <h4 className="text-small font-semibold leading-none text-default-600">
                                    {user?.name}
                                  </h4>
                                  <h5 className="text-small tracking-tight text-default-400">
                                    {user?.email}
                                  </h5>
                                </div>
                              </div>
                            </CardHeader>
                            <CardFooter className="gap-3">
                              <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small">
                                  4
                                </p>
                                <p className=" text-default-400 text-small">
                                  Following
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small">
                                  97.1K
                                </p>
                                <p className="text-default-400 text-small">
                                  Followers
                                </p>
                              </div>
                            </CardFooter>
                            <div className="p-2 w-full">
                              <Button
                                className={
                                  isFollowed
                                    ? "bg-transparent w-full text-foreground border-default-200"
                                    : "w-full"
                                }
                                color="primary"
                                radius="full"
                                size="sm"
                                variant={isFollowed ? "bordered" : "solid"}
                                onClick={handleSubmit}
                                onPress={() => setIsFollowed(!isFollowed)}
                              >
                                {isFollowed ? "Unfollow" : "Follow"}
                              </Button>
                            </div>
                          </Card>
                        </div>
                      }
                    >
                      <Avatar
                        isBordered
                        radius="lg"
                        size="md"
                        src={userPhoto}
                      />
                    </Tooltip>

                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-800">
                        {user?.name}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        {postDate}
                      </h5>
                    </div>
                  </div>

                </CardHeader>
                <CardBody className="px-3 space-y-1 overflow-hidden py-0 text-small text-default-400">
                  <p className="text-xl text-black font-bold dark:text-gray-100">
                    {title}
                  </p>
                  <p className="text-black dark:text-gray-400">{description}</p>
                  <span className="pt-2">
                    {category}
                    <span aria-label="computer" className="py-2" role="img">
                      💻
                    </span>
                  </span>
                </CardBody>
              </Card>

              <div className="w-full md:w-1/3 h-44">
                <Swiper
                  navigation
                  autoplay={{ delay: 5000 }}
                  className="mySwiper w-full h-44 object-contain rounded-xl"
                  modules={[Navigation, Autoplay]}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  slidesPerView={1}
                >
                  {images?.map((image: string, index: number) => (
                    <SwiperSlide key={index}>
                      <Image
                        alt={`Image ${index}`}
                        className="size-full object-cover"
                        height={500}
                        src={image}
                        width={500}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </Link>
          <div className="pt-5">
            <CardActions comment={undefined} currentUser={currentUser} post={post} />
          </div>
          <Divider className="border-2 mb-4" />
        </div>
      </motion.div>
    </div>
  );
};


export default PostCard;

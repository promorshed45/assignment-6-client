"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
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

const PostCard = ({ post }: any) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { title, description, images, user, createdAt } = post || {};
  const userPhoto =
    user?.profilePhoto || "https://nextui.org/avatars/avatar-1.png";
  const postDate = createdAt ? timeAgo(createdAt) : "";

  return (
    <div className="w-full">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {/* <Link className="block" href={`/posts/${post._id}`}> */}
          <div className="mx-auto rounded-lg pb-10">
            <Link className="block" href={`/posts/${post._id}`}>
            <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
                <Card className="overflow-hidden w-full md:w-2/3 bg-transparent shadow-none rounded-none">
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={userPhoto}
                      />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-800">
                          {user.name}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                          {postDate}
                        </h5>
                      </div>
                    </div>
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
                  </CardHeader>
                  <CardBody className="px-3 space-y-1 overflow-hidden py-0 text-small text-default-400">
                    <p className="text-xl text-black font-bold dark:text-gray-100">
                      {title}
                    </p>
                    <p className="text-black dark:text-gray-400">
                      {description}
                    </p>
                    <span className="pt-2">
                      #FrontendWithZoey
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
                  {images.map((image: string, index: number) => (
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
            <div className="pt-10">
                    <CardActions post={post} />
                  </div>
            <Divider className="border-2 my-4" />
          </div>
        {/* </Link> */}
      </motion.div>
    </div>
  );
};

export default PostCard;

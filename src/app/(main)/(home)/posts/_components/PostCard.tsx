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

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { timeAgo } from "@/src/utilis/timeFormat";
import { ArrowDown, ArrowUp } from "lucide";
import ProfileIcon from "@/src/components/iconComponents/ProfileIcon";
import Uparrow from "@/src/components/iconComponents/Uparrow";
import {
  ArrowBigDown,
  ArrowBigDownIcon,
  ArrowBigUp,
  MessageCircleMore,
} from "lucide-react";

const PostCard = ({ post }: any) => {

  console.log('post card', post);
  const [upvoteCount, setUpvoteCount] = useState(post?.upvote || 0);
  const [downvoteCount, setDownvoteCount] = useState(post?.downvote || 0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [disableLink, setDisableLink] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  const { title, description, images, user, createdAt } = post || {};
  const userPhoto =
    user?.profilePhoto || "https://nextui.org/avatars/avatar-1.png";
  const postDate = createdAt ? timeAgo(createdAt) : "";

  const handleUpvote = () => setUpvoteCount((prev: any) => prev + 1);
  const handleDownvote = () => setDownvoteCount((prev: any) => prev + 1);

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, { author: user.name, text: commentInput }]);
      setCommentInput(""); // Clear the input
    }
  };

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href={`/posts/${post._id}`} className="block">
          <div className="mx-auto rounded-lg pb-10">
            <div className="flex gap-5 justify-between items-center pb-10">
              {/* Profile Card */}
              <div className="flex w-2/3">
                <Card className="overflow-hidden w-full bg-transparent shadow-none rounded-none">
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
                      // onPress={() => {
                      //   setIsFollowed(!isFollowed);
                      //   setDisableLink(true);
                      // }}
                      onPress={() => {
                        setDisableLink(true); 
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
                      <span className="py-2" aria-label="computer" role="img">
                        💻
                      </span>
                    </span>
                  </CardBody>

                  {/* icons */}
                  <div className="mt-4 flex justify-between">
                    <div className="flex gap-3 items-center border-2 border-gray-600 px-3 rounded-md">
                      <div className="hover:bg-green-500/20 rounded-md px-3 py-2">
                        <Tooltip
                          content={
                            <div className="text-sm font-bold">Upvotes</div>
                          }
                        >
                          <button
                            className="flex items-center gap-2"
                            onClick={handleUpvote}
                          >
                            <ArrowBigUp className="size-5 text-green-600" />
                            {upvoteCount}
                          </button>
                        </Tooltip>
                      </div>
                      <div className="border-r border-gray-200"></div>

                      <div className="hover:bg-red-500/20 rounded-md px-3 py-2">
                        <Tooltip
                          content={
                            <div className="text-sm font-bold">Downvotes</div>
                          }
                        >
                          <button
                            className="flex items-center gap-2"
                            onClick={handleDownvote}
                          >
                            <ArrowBigDownIcon className="size-5 text-red-600" />
                            {downvoteCount}
                          </button>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="flex items-center gap-2"
                        
                        // onClick={handleShowComment}
                        onClick={() => {
                          handleShowComment();
                          setDisableLink(true);
                        }}>
                        
                        <MessageCircleMore className="size-5" />
                        {comments} 10
                      </button>
                    </div>
                  </div>

                  {/* Comment Section */}
                  {showComments && (
                    <div>
                      {comments.map((comment: any, index: any) => (
                        <div key={index} className="mb-2">
                          <strong>{comment.author}</strong>: {comment.text}
                        </div>
                      ))}
                      <div className="flex gap-2 mt-4">
                        <input
                          className="border p-2 w-full"
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Add a comment..."
                        />
                        <button
                          className="bg-blue-500 text-white p-2 rounded-md"
                          onClick={handleAddComment}
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  )}
                </Card>
              </div>

              {/* Image Carousel */}
              <div className="w-1/3 h-44">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation
                  autoplay={{ delay: 5000 }}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  className="mySwiper w-full h-full object-contain rounded-xl"
                >
                  {images.map((image: string, index: any) => (
                    <SwiperSlide key={index}>
                      <Image
                        width={500}
                        height={500}
                        alt={`Image ${index}`}
                        className="size-full object-cover"
                        src={image}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
             
            </div>
            <Divider className="border-2 my-4" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default PostCard;

"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Avatar,
  Button,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { useUser } from "@/src/providers/user.provider";
import Link from "next/link";
import {
  ArrowBigDownIcon,
  ArrowBigUpIcon,
  Heart,
  ThumbsDown,
  ThumbsUp,
  UserRound,
} from "lucide-react";

const NewsFeedSideBar = () => {
  const { user, setIsLoading: userLoading } = useUser();

  return (
    <>
      {user ? (
        <div className="justify-center items-center text-center mx-auto">
          <div className="flex justify-center">
            <Avatar src={user?.profilePhoto} className="w-32 h-32 text-large" />
          </div>
          <div className="pb-0 pt-2 px-4 flex-col items-start space-y-1">
            <p className="text-lg uppercase font-bold"> {user?.name} </p>
            <small className="text-default-500"> {user?.email} </small>
            <div className="py-2">
              <Link href="/profile/my-profile">
                <Button variant="bordered">View Profile</Button>
              </Link>
            </div>
            <Divider className="w-full" />

            <div className="flex gap-3 justify-center">
              <div className="hover:bg-green-500/20 rounded-md px-3 py-2">
                <Tooltip
                  content={<div className="text-sm font-bold">Follow</div>}
                >
                  <button className="flex items-center gap-2">
                    <Heart className="size-5 text-green-600" />
                    100 k
                  </button>
                </Tooltip>
              </div>

              <div className="hover:bg-red-500/20 rounded-md px-3 py-2">
                <Tooltip
                  content={<div className="text-sm font-bold">Followers</div>}
                >
                  <button className="flex items-center gap-2">
                    <UserRound className="size-5 text-red-600" />
                    30
                  </button>
                </Tooltip>
              </div>
            </div>

            <Divider className="w-full" />
            <div className="py-4">
             <Link href="/profile/create-post"> 
             <Button variant="solid" className="w-full">
                Create New Post
              </Button></Link>

            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NewsFeedSideBar;

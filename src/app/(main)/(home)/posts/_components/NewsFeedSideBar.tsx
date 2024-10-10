"use client";

import { Avatar, Button, Divider, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { Heart, UserRound } from "lucide-react";

import VerifyAccount from "../../../(user)/profile/my-profile/_components/VerifyAccount";

import { useUser } from "@/src/providers/user.provider"

const NewsFeedSideBar = () => {
  const { user } = useUser();

  return (
    <>
    {/* {userLoading && <Loading/>} */}
      {user ? (
        <div className="justify-center items-center text-center w-full mx-auto">
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 text-large" src={user?.profilePhoto} />
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
              <VerifyAccount/>
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

"use client";

import { Avatar, Button, Divider, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { Heart, ShieldEllipsis, UserRound } from "lucide-react";
import { Card, CardHeader, CardFooter } from "@nextui-org/react";


import { useUser } from "@/src/providers/user.provider";

const NewsFeedSideBar = () => {
  const { user } = useUser();

  console.log('usernewsfeed', user);
  return (
    <>
      {user ? (
        <div className="justify-center items-center text-center w-full mx-auto">
          <div className="flex justify-center">
            <Avatar isBordered className="h-32 w-32" radius="full" src={user?.profilePhoto} />
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
              <Card isFooterBlurred className="w-full h-[220px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-center space-y-4">
                  <h1 className="text-xl font-semibold">Verify Your Account</h1>
                  <p className="text-sm text-gray-600">
                    Unlock exciting new features and gain access to premium content by verifying your account today!
                  </p>
                </CardHeader>
                <CardFooter className="flex justify-center absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <>
                    <Link href="/profile/my-profile">
                    <Button className="border-green-700/50" variant="bordered">
                      <ShieldEllipsis className="text-green-500 size-5" />
                      Verify Now
                    </Button>
                    </Link>
                  </>
                </CardFooter>
              </Card>
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

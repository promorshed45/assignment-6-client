"use client";
import { Divider } from "@nextui-org/divider";
import { usePathname } from "next/navigation";
import React from "react";

import FollowCard from "@/src/components/ui/follow/FollowCard";
// import { TUser } from "@/src/redux/features/auth/authSlice";
import { useGetMyFollowingQuery } from "@/src/redux/features/following/followingApi";
import { TUser } from "@/src/types";
const MyFollowing = () => {
const pathname=usePathname()  
  const { data, isLoading } = useGetMyFollowingQuery(undefined);
  console.log(pathname);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  // console.log("--->",data?.data?.following?.length);
  const followings = data?.data?.following;
  // console.log(followings);
  return (
    <div>
      <div className="border-1  w-full rounded-xl">
        <div className="p-4">
          <h1>Following : {followings?.length ? followings?.length : "0"}</h1>
        </div>
        <Divider />
        {/* followers */}
        <div className="mt-2">
          {
           followings?.length >0 ? followings?.map((followingPeople:TUser)=>(<FollowCard key={followingPeople?._id} pathname={pathname} people={followingPeople}/>))
           :
           <div>
            <h1 className="text-center py-2">Yor Are Not Following Any Person.!</h1>
           </div>
          }
          {/* <FollowCard /> */}
        </div>
      </div>
    </div>
  );
};

export default MyFollowing;

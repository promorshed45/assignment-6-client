"use client";
import { Divider } from "@nextui-org/divider";
import { usePathname } from "next/navigation";
import React from "react";

import FollowCard from "@/src/components/ui/follow/FollowCard";
import { useGetMyFollowersQuery } from "@/src/redux/features/followers/followersAPi";
import { TUser } from "@/src/types";

const Followers = () => {
  const pathname=usePathname()
  const {data:followersData,isLoading}=useGetMyFollowersQuery(undefined)
  const followers=followersData?.data?.followers

// console.log(followers);

  return (
    <div>
      <div className="border-1  w-full rounded-xl">
        <div className="p-4">
          <h1>{followers?.length} Followers</h1>
        </div>
        <Divider />
        {/* followers */}
        <div className="mt-2">
          {
            
              followers?.map((follower :TUser)=><FollowCard key={follower?._id} pathname={pathname} people={follower}/>)
            
          }
       {/* <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/> */}
        </div>
      </div>
    </div>
  );
};

export default Followers;

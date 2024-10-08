"use client";
import { useParams } from "next/navigation";
import { Image } from "@nextui-org/react";

import bg from "@/src/assets/login1.jpg";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";
import { TPost, TUser } from "@/src/types";
import { useGetSpecificPostQuery } from "@/src/redux/features/post/postApi";

const FollowingProfile = () => {
  const { id } = useParams();
  // get followers info
  const { data: userData, isLoading:userLoading } = useGetSingleUserQuery(id as string);
// get followers post
const {data:post,isLoading:postLoading}=useGetSpecificPostQuery(id)
// user info
  const userInFo: TUser = userData?.data;
  // all post
  const posts=post?.data
  console.log(posts);
  return (
    <div>
      {/* main section */}
      <div className="relative">
        <div
          className="h-[250px] w-100% bg-stone-200 rounded-xl object-cover bg-cover"
          style={{ backgroundImage: `url(${bg.src})` }}
         />
        <div className="-mt-4 mx-5">
          <div className="flex gap-1 items-center">
            <Image
              className="size-[120px] border-3 border-white"
              radius="full"
              src={userInFo?.image}
            />
            <div className="flex justify-between items-start flex-1">
              <div>
                <h1 className="font-medium text-xl">{userInFo?.name}</h1>
                <p className="text-sm text-default-600">@tazahmedcs23</p>
                <p className="flex gap-4 text-blue-600 items-center">
                  <span>120 Followers</span>
                  {/* <span>- 150 Following</span> */}
                </p>
              </div>
              {/* button */}
            </div>
          </div>
        </div>
      </div>
      {/* content section */}
      <div className="mt-5 mx-5">
        {
          posts?.length >0 && posts?.map((postItem :TPost)=><NewsFeedCard key={postItem?._id} postItem={postItem}/>
        )
        }
      </div>
    </div>
  );
};

export default FollowingProfile;

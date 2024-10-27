/* eslint-disable prettier/prettier */

import NewsFeedTabs from "./_components/NewsFeedTabs";

import nexiosInstance from "@/src/config/nexios.config";
import { getCurrentUser } from "@/src/services/AuthService";
import { getFollowing } from "@/src/services/following";
import { TPost } from "@/src/types";

const NewsFeedPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const params = new URLSearchParams(searchParams);

  const currentUser = await getCurrentUser();
  const currentUserEmail = currentUser?.email;

  // Fetch posts based on the search parameters
  const response = await nexiosInstance.get(`/post`, {
    headers: {
      'Cache-Control': 'no-store',
    },
    next: { tags: ["posts"] },
    params: {
      searchTerm: params.get("query") || "", 
    },
  });

  const { data }: any = response?.data;

  // console.log("API Response Data:", data); 


  // const { data: followingData }: any = await getFollowing();
  // console.log('followingData', followingData);
  
  // Filter posts by status
  const premiumPosts = data?.filter((post: TPost) => post.status === "PREMIUM") || [];
  const freePosts = data?.filter((post: TPost) => post.status === "FREE") || [];
  const myPosts = data.filter((post: TPost) => post?.user?.email === currentUserEmail);


  // Return the component
  return (
    <div className="flex py-8 md:py-16">
      <NewsFeedTabs
        freePost={freePosts}
        myPosts={myPosts}
        premiumPosts={premiumPosts}
      />
    </div>
  );
};

export default NewsFeedPage;

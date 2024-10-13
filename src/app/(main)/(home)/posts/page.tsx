/* eslint-disable prettier/prettier */

import NewsFeedTabs from "./_components/NewsFeedTabs";

import nexiosInstance from "@/src/config/nexios.config";
import { getCurrentUser } from "@/src/services/AuthService";
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
      searchTerm: params.get("query") || "", // Use empty string if no query
    },
  });

  const { data }: any = response?.data;

  console.log("API Response Data:", data); // Log the response

  // Filter posts by status
  const premiumPosts = data?.filter((post: TPost) => post.status === "PREMIUM") || [];
  const freePosts = data?.filter((post: TPost) => post.status === "FREE") || [];
  const myPosts = data.filter((post: TPost) => post?.user?.email === currentUserEmail);

  // Show a message if no posts are available
  if (!data || data.length === 0) {
    return <div>No posts available.</div>; // Optional: Add a loader or message
  }

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

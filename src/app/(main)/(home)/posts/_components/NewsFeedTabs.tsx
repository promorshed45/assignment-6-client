"use client";

import { Tabs, Tab } from "@nextui-org/react";
import PostCard from "./PostCard";
import NewsFeedSideBar from "./NewsFeedSideBar";
import { useUser } from "@/src/providers/user.provider";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
}

interface NewsFeedTabsProps {
  freePost: Post[];
  premiumPosts: Post[];
}

const NewsFeedTabs: React.FC<NewsFeedTabsProps> = ({
  freePost,
  premiumPosts,
}) => {
  const { user } = useUser();

  return (
    <div
      className={`max-w-full mx-auto flex ${
        user ? "container justify-between" : ""
      }`}
    >
      <div className="max-w-full">
        <Tabs aria-label="Options" color="primary" variant="bordered">
          {/* All Posts Tab */}
          <Tab
            key="all-posts"
            title={
              <div className="flex items-center space-x-2">
                <span>All Posts</span>
              </div>
            }
          >
            <div className={`user ? "w-4/5" : "w-full" `}>
              {freePost?.map((post: Post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </Tab>

          {/* Music Posts Tab */}
          <Tab
            key="music-posts"
            title={
              <div className="flex items-center space-x-2">
                <span>Premium Post</span>
              </div>
            }
          >
            {user && user?.verified === "false" ? (
              <div className={user ? "w-4/5" : "w-full"}>
                {premiumPosts?.map((post: Post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <Link href="/verify-account"> <p className="text-rose-500 py-5 cursor-pointer text-lg"> Please verify your account to see premium posts... </p> </Link>
            )}
          </Tab>

          {/* Videos Tab */}
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <span>Videos</span>
              </div>
            }
          >
            {/* Add content here if needed */}
            <div className="w-4/5">Videos content coming soon...</div>
          </Tab>
        </Tabs>
      </div>
      {user ? (
        <div className="w-1/5 h-full">
          <NewsFeedSideBar />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewsFeedTabs;

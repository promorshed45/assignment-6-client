"use client";

import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";

import PostCard from "./PostCard";
import NewsFeedSideBar from "./NewsFeedSideBar";

import { useUser } from "@/src/providers/user.provider";

interface Post {
  _id: string;
  title: string;
  content: string;
}

interface NewsFeedTabsProps {
  freePost: Post[];
  premiumPosts: Post[];
  myPosts: Post[];
}

const NewsFeedTabs: React.FC<NewsFeedTabsProps> = ({
  freePost,
  premiumPosts,
  myPosts
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

          {/* Premium Posts Tab */}
          <Tab
            key="premium-posts"
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
              <Link href="/verify-account">
                {" "}
                <p className="text-rose-500 py-5 cursor-pointer text-lg">
                  {" "}
                  Please verify your account to see premium posts...{" "}
                </p>{" "}
              </Link>
            )}
          </Tab>

          {/* My Posts Tab */}
          <Tab
            key="myPosts-posts"
            title={
              <div className="flex items-center space-x-2">
                <span>My Posts</span>
              </div>
            }
          >
            <div className={`user ? "w-4/5" : "w-full" `}>
              {myPosts?.map((post: Post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
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

"use client";

import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";

import PostCard from "./PostCard";
import NewsFeedSideBar from "./NewsFeedSideBar";

import { useUser } from "@/src/providers/user.provider";
import PostModal from "@/src/components/createPost/CreatePost";

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
  myPosts,
}) => {
  const { user } = useUser();

  return (
    <>
      <div className="w-full md:w-4/5 mx-auto md:px-16">
        {/* <div className={`w-2/3 ${user ? "md:w-4/5" : "md:max-w-3/4"}`}> */}
        {user ? (
          <div className="">
            <PostModal />
          </div>
        ) : (
          ""
        )}

        {user ? (
          <div>
            <Tabs
              aria-label="Options"
              classNames={{
                tabList:
                  "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#22d3ee]",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[#06b6d4]",
              }}
              color="primary"
              variant="underlined"
            >
              {/* All Posts Tab */}
              <Tab
                key="all-posts"
                title={
                  <div className="flex items-center space-x-2">
                    <span>All Posts</span>
                  </div>
                }
              >
                <div>
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
                {user.verified ? (
                  <div>
                    {
                      premiumPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                      ))
                    }
                  </div>
                ) : (
                  <Link href="/profile/my-profile">
                    <p className="text-rose-500 py-5 cursor-pointer text-lg text-center">
                      Please verify your account to see premium posts...
                    </p>
                  </Link>
                )}
              </Tab>

              {/* My Posts Tab */}
              {user ? (
                <Tab
                  key="my-posts"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>My Posts</span>
                    </div>
                  }
                >
                  <div className="w-full">
                    {myPosts?.map((post: Post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                </Tab>
              ) : (
                ""
              )}

              {/* Videos Tab */}
              {/* <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <span>Videos</span>
              </div>
            }
          >
            <div className="w-full md:w-4/5 text-center">Videos content coming soon...</div>
          </Tab> */}
            </Tabs>
          </div>
        ) : (
          <div>
            {freePost?.map((post: Post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>

      {user && (
        <div className="hidden lg:flex w-full lg:w-1/5">
          <NewsFeedSideBar />
        </div>
      )}
    </>
  );
};

export default NewsFeedTabs;

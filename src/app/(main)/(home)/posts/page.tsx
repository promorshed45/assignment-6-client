/* eslint-disable prettier/prettier */
import NewsFeedTabs from "./_components/NewsFeedTabs";

import nexiosInstance from "@/src/config/nexios.config";
import { getCurrentUser } from "@/src/services/AuthService";
import { TPost } from "@/src/types";

const NewsFeedPage = async () => {
  const currentUser = await getCurrentUser();
  const currentUserEmail = currentUser?.email;

  // console.log("abc", currentUserEmail);

  const respone = await nexiosInstance.get("/post", { cache: "no-store", next: { tags: ['posts']} });
  const { data }: any = respone?.data;

  const premiumPosts = data?.filter((post: TPost) => post.status === "PREMIUM");
  const freePost = data?.filter((post: TPost) => post.status === "FREE");
  const myPosts = data.filter((post: any) => post?.user?.email === currentUserEmail);

  // console.log('premiumPosts', premiumPosts);
  // console.log('freePost', freePost);
  // console.log('all post', data);
  return (
    <>
      <div className="flex py-8 md:py-16">
        <NewsFeedTabs freePost={freePost} myPosts={myPosts} premiumPosts={premiumPosts} />
      </div>
    </>
  );
};

export default NewsFeedPage;

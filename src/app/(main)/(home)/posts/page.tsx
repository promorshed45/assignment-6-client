import nexiosInstance from "@/src/config/nexios.config";
import NewsFeedTabs from "./_components/NewsFeedTabs";
import { IPost } from "@/src/types";

const NewsFeedPage = async () => {
  const respone = await nexiosInstance.get("/post", { cache: "no-store" });
  // const myPosts = await nexiosInstance.get("/post/${id}", { cache: "no-store" });

  const { data }: any = respone?.data;

  const premiumPosts = data?.filter((post: IPost) => post.status === "PREMIUM");
  const freePost = data?.filter((post: IPost) => post.status === "FREE");

  // console.log('premiumPosts', premiumPosts);
  // console.log('freePost', freePost);
  // console.log('all post', data);
  return (
    <>
      <div className="flex py-8 md:py-16">
       
       <NewsFeedTabs premiumPosts={premiumPosts} freePost={freePost}/>
      
     </div>
    </>
  );
};

export default NewsFeedPage;


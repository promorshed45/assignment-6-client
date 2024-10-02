import nexiosInstance from "@/src/config/nexios.config";
import PostCard from "./_components/PostCard";

const NewsFeedPage = async () => {
  const respone = await nexiosInstance.get("/post", {cache: "no-store"});

  const { data }: any = respone?.data;

  return (
    <div>
      {data?.map((post: any) => (
        <PostCard key={data._id} postsData={post} />
      ))}
    </div>
  );
};

export default NewsFeedPage;

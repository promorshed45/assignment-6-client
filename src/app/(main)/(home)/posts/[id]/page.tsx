
import PostDetails from "./_components/PostDetails";
import nexiosInstance from "@/src/config/nexios.config";

interface IProps {
  params: {
    id: string;
  };
}

const page = async ({ params: { id } }: IProps) => {
  const response = await nexiosInstance.get(`/post/${id}`, {
    cache: "no-store",
  });

  const { data }: any = response.data; // Fixed the response destructuring

  // console.log('response id', data);

  return (
    <div className="container mx-auto my-3 max-w-[720px]">
      <PostDetails data={data} />
    </div>
  );
};

export default page;

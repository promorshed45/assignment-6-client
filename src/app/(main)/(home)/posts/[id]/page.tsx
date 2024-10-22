
import PostDetails from "./_components/PostDetails";

import { IParamsProps } from "@/src/types";
import nexiosInstance from "@/src/config/nexios.config";


const page = async ({ params: { id } }: IParamsProps) => {
  const response = await nexiosInstance.get(`/post/${id}`, {
    next: { tags: ['posts']}
  });

  const { data }: any = response.data; 


  const commentData = await nexiosInstance.get(`/comment/${id}`, {
    cache: "no-store", next: { tags: ['comments']}
  });

  const comment: any = commentData.data; 

  // console.log('post details page teke comment', comment);


  return (
    <div className="container mx-auto my-3 max-w-[720px]">
      <PostDetails comment={comment} data={data} />
    </div>
  );
};

export default page;

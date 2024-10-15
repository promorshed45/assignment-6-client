import ContentManagement from "./_components/ContentManagement";

import nexiosInstance from "@/src/config/nexios.config";

const contentManagementPage = async() => {
  const respone = await nexiosInstance.get("/post", { cache: "no-store", next: { tags: ['posts']} });
  const { data }: any = respone?.data;

  console.log('all post', data);
  return (
    <div>
        <ContentManagement allPost={data}/>
    </div>
  );
};

export default contentManagementPage;

import PaymenttManagement from './_components/PaymenttManagement';

import nexiosInstance from '@/src/config/nexios.config';

const page = async () => {
  const respone = await nexiosInstance.get("/verify/all-payment", { cache: "no-store", next: { tags: ['payments']} });
  const { data }: any = respone?.data;

  console.log('all payment', data);
  return (
    <div>
      <PaymenttManagement payments={data}/>
    </div>
  );
};

export default page;
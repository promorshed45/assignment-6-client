import React from 'react';

import AllUser from '../_components/AllUser';

import nexiosInstance from '@/src/config/nexios.config';

const userManagement = async () => {
  const respone = await nexiosInstance.get("/users", { cache: "no-store" });

  const { data }: any = respone?.data;


  return (
    <div>
      <AllUser allUser={data} />
    </div>
  );
};

export default userManagement;
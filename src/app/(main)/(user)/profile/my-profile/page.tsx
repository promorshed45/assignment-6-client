
import React from 'react';
import MyProfile from './_components/MyProfile';
import { gettoken } from '@/src/services/AuthService';
import nexiosInstance from '@/src/config/nexios.config';

const page = async () => {

    const token = await gettoken();

    const response = await nexiosInstance.get("/profile", {
      cache: "no-store",
      headers: {
        Authorization: `${token}`, 
      },
    });
  
    const { data } = response;
    // console.log("My profile", data);


    return (
        <div className='py-5 md:py-16'>
            <MyProfile user={data}/>
        </div>
    );
};

export default page;
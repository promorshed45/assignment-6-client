"use server";

import nexiosInstance from "@/src/config/nexios.config";

export const verifyAccount = async (userData: any) => {
    try {
      const { data } = await nexiosInstance.post("/verify", userData);
      console.log('verifi server', data);
      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

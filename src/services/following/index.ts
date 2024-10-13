"use server";
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFollow } from "@/src/types";
import nexiosInstance from "@/src/config/nexios.config";
import envconfig from "@/src/config/envConfig";


// export const getFollowing = async () => {
//   try {
//     const response = await axiosInstance.get("/following");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching following data:", error.response ? error.response.data : error.message);
//     throw new Error("Failed to get following data");
//   }
// };


export const addFollow = async (followData: TFollow) => {
  try {
    const response = await axiosInstance.post("/following", followData);
    revalidateTag("follows");
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};


export const getFollowing = async () => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await nexiosInstance.get("/following", fetchOptions);

  
  console.log("server hote", res.data);
  return res.data;
};

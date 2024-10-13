"use server";
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFollow } from "@/src/types";
import nexiosInstance from "@/src/config/nexios.config";


export const getfollowing = async () => {
  try {

    const response = await nexiosInstance.get("/following", { cache: "no-store", next: { tags: ['follows'] } });
    console.log("followInfo.. server hote", response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get following data");
  }
};


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


"use server";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/lib/axiosInstance";

export const addPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/post", postData);
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};



export const updatePost = async (id: string, payload: any) => {
  try {
    const response = await axiosInstance.patch(
      `/post/${id}`,
      payload
    );
    revalidateTag("posts");
    console.log("update post", response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};


export const deletePost = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/post/${postId}`);
    revalidateTag("posts");
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};












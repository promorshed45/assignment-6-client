"use server";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export const addPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/post", postData);
    console.log(data);
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};



export const updatePost = async (postId: string, postData: any) => {
  try {
    const response = await axiosInstance.patch(
      `/post/${postId}`,
      postData
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


export const postComment = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/comment", userData);

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/comment/${commentId}`);
    return response.data;
  } catch (error: any) {
    // console.error(error);
    throw new Error(error);
  }
};

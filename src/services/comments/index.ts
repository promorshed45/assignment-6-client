"use server";

import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/lib/axiosInstance";

export const postComment = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/comment", userData);
    revalidateTag("comments");
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateComment = async (userId: string, commentData: any) => {
  try {
    const response = await axiosInstance.put(
      `/comment/${userId}`,
      commentData
    );
    revalidateTag("comments");
    console.log("response comment", response);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/comment/${commentId}`);
    revalidateTag("comments");
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

"use server";

import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/lib/axiosInstance";
import nexiosInstance from "@/src/config/nexios.config";

export const getComments = async (postId: string): Promise<any> => {
  try {
    const { data } = await nexiosInstance.get(`/comment/${postId}`, {
      cache: "no-store",
      next: { tags: ['comments'] }
    });
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }
};


export const postComment = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/comment", userData);
    revalidateTag("comments");
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const updateComment = async (userId: string, commentData: any) => {
  try {
    const response = await axiosInstance.put(`/comment/${userId}`, commentData);
    revalidateTag("comments");
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/comment/${commentId}`);
    revalidateTag("comments");
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};




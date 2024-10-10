"use server";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/axiosInstance";

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


  export const deletePost = async (postId: string) => {
    try {
        const response = await axiosInstance.delete(`/post/${postId}`);
        return response.data; 
    } catch (error: any) {
        // console.error(error);
        throw new Error(error);
    }
};


  export const updateMyPost = async (id: string, userData: FieldValues) => {
    try {
      const { data } = await axiosInstance.put(`/post/${id}`, userData);
      return data;
    } catch (error: any) {
      // console.error(error);
      throw new Error(error.message || "Failed to update post.");
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
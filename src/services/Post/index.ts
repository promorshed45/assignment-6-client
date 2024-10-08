"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/axiosInstance";

export const addPost = async (postData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/post", postData);
    
      return data;
    } catch (error: any) {
        console.error(error);
      throw new Error(error);
    }
  };
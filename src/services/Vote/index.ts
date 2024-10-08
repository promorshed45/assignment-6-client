"use server";
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance";

export const addedUpvote = async (voteData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/upvote", voteData);
    
      return data;
    } catch (error: any) {
        console.error(error);
      throw new Error(error);
    }
  };

  export const addedDownvote = async (voteData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/downvote", voteData);
    
      return data;
    } catch (error: any) {
        console.error(error);
      throw new Error(error);
    }
  };
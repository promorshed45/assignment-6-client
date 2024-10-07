"use server"
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance";

export const updateMyPost = async (id: string, userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/post/${id}`, userData);
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to update post.");
  }
};

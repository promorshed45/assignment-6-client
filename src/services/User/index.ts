"use server";

import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/lib/axiosInstance";

export const updateUser = async (userId: string, userData: any) => {
  try {
    const response = await axiosInstance.patch(`/users/updateUser/${userId}`, userData);
    revalidateTag('users');
      return response.data;
  } catch (error: any) {
      console.error(error);
      throw new Error(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    revalidateTag('users');
      return response.data;
  } catch (error: any) {
      console.error(error);
      throw new Error(error);
  }
};
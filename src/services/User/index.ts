"use server";

import axiosInstance from "@/src/lib/axiosInstance";

export const updateUser = async (userId: string, userData: any) => {
  try {
    const response = await axiosInstance.patch(`/users/updateUser/${userId}`, userData);
      console.log(response);
      return response.data;
  } catch (error: any) {
      console.error(error);
      throw new Error(error);
  }
};
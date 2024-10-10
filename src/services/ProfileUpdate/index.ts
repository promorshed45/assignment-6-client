"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/axiosInstance";

export const updateProfile = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch("/profile", userData);

    return data;
  } catch (error: any) {
    // console.error(error);
    throw new Error(error);
  }
};

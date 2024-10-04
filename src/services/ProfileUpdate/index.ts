"use server";

import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance";


export const updateProfile = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/profile", userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

"use server";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/axiosInstance";

export const verifyAccount = async (userId: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/verifyAccount", userId);
      // console.log(data);
      return data;
    } catch (error: any) {
        console.error(error);
      throw new Error(error);
    }
  };

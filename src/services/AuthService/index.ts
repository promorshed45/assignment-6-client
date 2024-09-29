"use server";

import { FieldValues } from "react-hook-form";

import nexiosInstance from "@/src/config/nexios.config";

export const loginUser = async (userData: FieldValues) => {
  try {
    const data = await nexiosInstance.post("/auth/login", userData);

    console.log("services teke", data);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

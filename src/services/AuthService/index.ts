/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/src/lib/axiosInstance";

export const registerUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/register", userData);
        return data;
    } catch (error: any) {
        throw new Error(`Registration failed: ${error.message}`);
    }
};

export const loginUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", userData);
        if (data.success) {
            cookies().set("accessToken", data?.accessToken);
            cookies().set("refreshToken", data?.refreshToken);
          }
        return data;
        console.log(data);
    } catch (error: any) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

export const logout = () =>{
    cookies().delete("accessToken")
    cookies().delete("refreshToken")
}


export const getCurrentUser = async() => {
    const accessToken = cookies().get("accessToken")?.value;

    let decodedToken = null;
    if(accessToken){
        decodedToken = await jwtDecode(accessToken)

        return {
            _id: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
            mobileNumber: decodedToken.mobileNumber,
            role: decodedToken.role,
            profilePhoto: decodedToken.profilePhoto
        }
    }
    console.log('decodedToken', decodedToken);
    return decodedToken;
}

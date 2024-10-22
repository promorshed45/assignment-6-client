"use server";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/lib/axiosInstance";
import nexiosInstance from "@/src/config/nexios.config";

export const addPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/post", postData);
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};



export const updatePost = async (id: string, payload: any) => {
  try {
    const response = await axiosInstance.patch(
      `/post/${id}`,
      payload
    );
    revalidateTag("posts");
    console.log("update post", response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};


export const deletePost = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/post/${postId}`);
    revalidateTag("posts");
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};




export const pdftGenerate = async (post) => {
  try {
    console.log('Sending request to generate PDF with post:', post);
    
    const response = await axiosInstance.post(`/post/create-pdf`, post, {
      responseType: 'blob', // ব্লব রেসপন্স প্রাপ্তির জন্য
    });

    console.log('Received response status:', response.status);
    console.log('Received response headers:', response.headers);
    
    // রেসপন্সের ধরনের লগ
    // console.log('Response data type:', typeof response.data);

    // রেসপন্স ব্লব কিনা তা যাচাই করুন
    if (response.data instanceof Blob) {
      const url = URL.createObjectURL(response.data);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `${post._id || Date.now()}.pdf`; // পোস্ট আইডি অথবা বর্তমান টাইমস্ট্যাম্প
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      console.log('PDF downloaded successfully.');
      return response.data; // প্রয়োজন হলে PDF ব্লব ফেরত দিন
    } else {
      // যদি অপ্রত্যাশিত রেসপন্স হয়
      throw new Error('Failed to generate PDF');
    }
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error(error.message || 'An error occurred while generating the PDF.');
  }
};










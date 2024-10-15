import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { addPost, deletePost, updatePost } from "../../services/Post";


export const useAddNewPost = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["ADD_POST"],
      mutationFn: async (postData) => await addPost(postData),
      onSuccess: () => {
        toast.success("Post successfully created...");
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || "Failed to create post... try again";
        toast.error(errorMessage);
      },
    });
  };



export const useUpdatePost = () => {
  return useMutation<any, Error, { id: string; payload: any }>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ id, payload }) => await updatePost(id, payload),
    onSuccess: () => {
      toast.success("Post updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useDeletePost = () => {
  return useMutation<any, Error, { postId: string}>({
    mutationKey:  ["DELETE_POST"],
    mutationFn: async ({ postId }) => await deletePost(postId),
    onSuccess: () => {
      toast.success("Post deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};



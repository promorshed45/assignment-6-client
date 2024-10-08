import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { addPost, deleteComment, postComment, updateMyPost } from "../../services/Post";


export const useAddNewPost = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_ADDNEWPOST"],
      mutationFn: async (postData) => await addPost(postData),
      onSuccess: () => {
        toast.success("post successfully created...");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };



  
  

  // Hook to handle updating the post
export const useUpdateMyPost = () => {
  return useMutation<any, Error, { id: string; formData: FormData }>({
    mutationKey: ["USER_UPDATEMYPOST"],
    mutationFn: async ({ formData, id }) => {
      // Call the service that sends the data to the server
      return await updateMyPost(id, formData as any);
    },
    onSuccess: () => {
      toast.success("Post updated successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to update post.");
    },
  });
};


export const usePostComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_COMMENT"],
    mutationFn: async (userData) => await postComment(userData),
    onSuccess: () => {
      toast.success("Comment post successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useDeleteComment = () => {
  return useMutation<any, Error, string>({
      mutationKey: ["DELETE_COMMENT"],
      mutationFn: async (commentId) => await deleteComment(commentId),
      onSuccess: () => {
          toast.success("Comment deleted successfully.");
      },
      onError: (error) => {
          toast.error(error.message);
      },
  });
};

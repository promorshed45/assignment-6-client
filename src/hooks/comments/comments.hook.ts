import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { deleteComment, getComments, postComment, updateComment } from "@/src/services/comments";

export const usePostComment = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["ADD_COMMENT"],
      mutationFn: async (userData) => await postComment(userData),
      onSuccess: () => {
        toast.success("Comment post successful.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  

export const useUpdateComment = () => {
    return useMutation<any, Error, { commentId: string; commentData: any }>({
      mutationKey: ["UPDATE_COMMENT"],
      mutationFn: async ({ commentId, commentData }) => await updateComment(commentId, commentData),
      onSuccess: () => {
        toast.success("Comment updated successfully.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  export const useDeleteComment = () => {
    return useMutation<any, Error, { commentId: string}>({
      mutationKey: ["DELETE"],
      mutationFn: async ({ commentId }) => await deleteComment(commentId),
      onSuccess: () => {
        toast.success("Comment deleted successfully.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  export const useGetComments = (postId: string) => {
    return useQuery<{postId: string}>({
      queryKey: ["GET_COMMENTS", postId],
      queryFn: async () => await getComments(postId),
    });
  };
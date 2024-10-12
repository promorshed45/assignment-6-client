import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { deleteComment, postComment } from "@/src/services/comments";

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
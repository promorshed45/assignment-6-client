import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { postComment } from "../services/Comments";


export const usePostComment = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_LOGIN"],
      mutationFn: async (userData) => await postComment(userData),
      onSuccess: () => {
        toast.success("Comment post successful.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  
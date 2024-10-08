import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { addPost } from "../services/Post";


export const useAddNewPost = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_LOGIN"],
      mutationFn: async (postData) => await addPost(postData),
      onSuccess: () => {
        toast.success("Comment post successful.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  
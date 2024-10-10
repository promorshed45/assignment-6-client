import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { addPost } from "../../services/Post";


export const useAddUpVote = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_UPVOTE"],
      mutationFn: async (voteData) => await addPost(voteData),
      onSuccess: () => {
        toast.success("Upvote successfully added...");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };


  export const useAddNewPost = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_DOWNUPVOTE"],
      mutationFn: async (voteData) => await addPost(voteData),
      onSuccess: () => {
        toast.success("downvote successfully added...");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  
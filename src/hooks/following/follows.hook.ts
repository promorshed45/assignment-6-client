import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { TFollow } from "@/src/types";
import { addFollow, getfollowing } from "@/src/services/following";


export const useAddFollow = () => {
  return useMutation<any, Error, TFollow>({
    mutationKey: ["ADD_FOLLOW"],
    mutationFn: async (followData) => await addFollow(followData),
    onSuccess: () => {
      toast.success("Follow action successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetFollowing = () => {
  return useQuery<any, Error>(['GET_FOLLOWING'], getfollowing, {
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

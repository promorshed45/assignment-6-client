import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateUser } from "@/src/services/User";

export const useUpdateUser = () => {
    return useMutation<any, Error, { userId: string; userData: any }>({
      mutationKey: ["UPDATE_USER"],
      mutationFn: async ({ userId, userData }) => await updateUser(userId, userData),
      onSuccess: () => {
        toast.success("User updated successfully.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { updateProfile } from "../services/ProfileUpdate";
import { toast } from "sonner";

export const useUserUpdateProfile = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_UPDATEPROFILE"],
    mutationFn: async (userData) => await updateProfile(userData),
    onSuccess: () => {
      toast.success("User profile updated successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


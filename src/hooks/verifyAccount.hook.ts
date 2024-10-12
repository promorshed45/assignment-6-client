import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { verifyAccount } from "../services/verifyAccount";

export const useUserVerifyAccount = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ACCOUNT_VERIFY"],
    mutationFn: async (userId) => await verifyAccount(userId),
    onSuccess: (data) => {
        if (data?.payment_url) {
          window.location.href = data.payment_url;
        } else {
          toast.error("Verification failed. Please try again.");
        }
      },
      onError: (error) => {
        console.error(error);
      toast.error(error.message);
    },
  });
};

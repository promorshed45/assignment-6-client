import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { verifyAccount } from "../services/verifyAccount";

export const useUserVerifyAccount = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["ACCOUNT_VERIFY"],
    mutationFn: async (userData) => await verifyAccount(userData),
    onSuccess: (data) => {
      if(data.success){
        toast.success("success verification")
        window.location.href = data.data.payment_url;
        console.log('hook hote', data);
      }else{
        toast.error(data.message)
      } 
    },
      onError: (error) => {
        console.error(error);
    },
  });
};

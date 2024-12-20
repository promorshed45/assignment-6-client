import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { loginUser, registerUser } from "../services/AuthService";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: (data) => {
      if(data.success){
        toast.success("User registration successful.");        
      }else{
        toast.error(data.message)
      } 
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      if(data.success){
        toast.success("User login successful.");
      }else{
        toast.error(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

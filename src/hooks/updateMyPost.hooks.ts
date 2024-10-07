import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateMyPost } from "../services/MyPostUpdate";

// Correct mutation function to accept object with both id and formData
export const useUpdateMyPost = () => {
  return useMutation<any, Error, { id: string; formData: FormData }>({
    mutationKey: ["USER_UPDATEMYPOST"],
    mutationFn: async ({ formData, id }) => {
      return await updateMyPost(formData, id);
    },
    onSuccess: () => {
      toast.success("Post updated successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to update post.");
    },
  });
};

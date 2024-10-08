import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateMyPost } from "../services/MyPostUpdate";

// Hook to handle updating the post
export const useUpdateMyPost = () => {
  return useMutation<any, Error, { id: string; formData: FormData }>({
    mutationKey: ["USER_UPDATEMYPOST"],
    mutationFn: async ({ formData, id }) => {
      // Call the service that sends the data to the server
      return await updateMyPost(id, formData as any);
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

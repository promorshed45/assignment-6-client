import nexiosInstance from "@/src/config/nexios.config";

export const searchPost = async (searchTerm: string) => {
    try {
      const response = await nexiosInstance.get(`/post?searchTerm=${searchTerm}`,);
    
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get following data");
    }
  };
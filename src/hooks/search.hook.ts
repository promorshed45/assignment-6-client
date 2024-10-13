import { useMutation } from "@tanstack/react-query";

import { searchPost } from "../services/search";


  export const useSearchPost = () => {
    return useMutation({
      mutationKey:  ["SEARCH_POST"],
      mutationFn: async (searchTerm: string) => await searchPost(searchTerm),
    });
  };
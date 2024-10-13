import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { TFollow } from "@/src/types";
import { addFollow, getFollowing } from "@/src/services/following";

// Custom hook to add a follow
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

// Custom hook to fetch following data
export const useFollowing = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowingData = async () => {
      try {
        const data: any = await getFollowing();
        setFollowing(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingData();
  }, []);

  return { following, loading, error };
};

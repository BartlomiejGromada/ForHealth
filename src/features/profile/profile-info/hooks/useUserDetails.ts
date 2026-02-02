import { useFetch } from "@/hooks/useFetch";
import { useLoggedUserId } from "@/hooks/useLoggedUserId";
import { useAppStore } from "@/store";
import { UserDetails } from "@/types/User";
import { useCallback, useEffect } from "react";
import { userDetailsRequest } from "../api/userDetailsRequest";

export const useUserDetails = () => {
  const userId = useLoggedUserId();

  const setDetailsOfUser = useAppStore(state => state.setUserDetails);
  const detailsOfUser = useAppStore(state => state.user?.details);

  const fetchProfileDetails = useCallback(() => userDetailsRequest({ userId }), [userId]);

  const handleFetchSuccess = useCallback(
    (payload: UserDetails | null) => {
      setDetailsOfUser(payload);
    },
    [setDetailsOfUser]
  );

  const { fetch, isLoading, isSuccess, isError } = useFetch<UserDetails | null>({
    onFetch: fetchProfileDetails,
    onSuccess: handleFetchSuccess,
  });

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { userDetails: detailsOfUser, isLoading, isSuccess, isError };
};

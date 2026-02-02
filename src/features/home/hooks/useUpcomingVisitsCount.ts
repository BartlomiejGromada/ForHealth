import { useFetch } from "@/hooks/useFetch";
import { useLoggedUserId } from "@/hooks/useLoggedUserId";
import { useCallback, useEffect, useState } from "react";
import { getUpcomingVisitsCountRequest } from "../api/upcomigVisitsApi";

export default function useUpcomingVisitsCount() {
  const userId = useLoggedUserId();

  const [count, setCount] = useState<number>(0);

  const onFetchCallback = useCallback(() => getUpcomingVisitsCountRequest({ userId }), [userId]);

  const onSuccessCallback = useCallback((payload: number) => {
    setCount(payload);
  }, []);

  const { fetch, isLoading, isSuccess } = useFetch<number>({
    onFetch: onFetchCallback,
    onSuccess: onSuccessCallback,
  });

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { count, isLoading, isSuccess };
}

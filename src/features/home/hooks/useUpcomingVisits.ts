import { useFetch } from "@/hooks/useFetch";
import { useUserId } from "@/hooks/useUserId";
import { Visit } from "@/types/Visit";
import { useCallback, useEffect, useState } from "react";
import { getUpcomingVisitsRequest } from "../api/upcomigVisitsApi";

type useUpcomingVisitsProps = {
  count?: number;
};

export default function useUpcomingVisits({ count }: useUpcomingVisitsProps) {
  const userId = useUserId();

  const [visits, setVisits] = useState<Visit[]>([]);

  const onFetchCallback = useCallback(
    () => getUpcomingVisitsRequest({ userId, count }),
    [count, userId]
  );

  const onSuccessCallback = useCallback((payload: Visit[]) => {
    setVisits(payload);
  }, []);

  const { fetch, isLoading, isSuccess } = useFetch<Visit[]>({
    onFetch: onFetchCallback,
    onSuccess: onSuccessCallback,
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { visits, isLoading, isSuccess };
}

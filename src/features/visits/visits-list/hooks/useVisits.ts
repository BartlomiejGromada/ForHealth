import { useFetch } from "@/hooks/useFetch";
import { useUserId } from "@/hooks/useUserId";
import { Visit } from "@/types/Visit";
import { useCallback, useEffect, useState } from "react";
import { visitsByUserIdRequest } from "../api/visitsByUserIdRequest";

type useVisitsProps = {};

export const useVisits = ({}: useVisitsProps) => {
  const userId = useUserId();

  const [visits, setVisits] = useState<Visit[] | null>();

  const fetchVisitDetails = useCallback(() => visitsByUserIdRequest({ userId }), [userId]);

  const handleFetchSuccess = useCallback((payload: Visit[] | null) => {
    setVisits(payload);
  }, []);

  const { fetch, isLoading, isSuccess } = useFetch<Visit[] | null>({
    onFetch: fetchVisitDetails,
    onSuccess: handleFetchSuccess,
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { visits, isLoading, isSuccess };
};

import { useFetch } from "@/hooks/useFetch";
import { useUserId } from "@/hooks/useUserId";
import { useAppStore } from "@/store";
import { Visit } from "@/types/Visit";
import { useCallback, useEffect } from "react";
import { visitByIdRequest } from "../api/vistiByIdRequest";

type useVisitDetailsProps = {
  visitId: string;
};

export const useVisitDetails = ({ visitId }: useVisitDetailsProps) => {
  const userId = useUserId();

  const setDetaislOfVisit = useAppStore(state => state.setDetaislOfVisit);
  const detailsOfVisit = useAppStore(state => state.detailsOfVisit);

  const fetchVisitDetails = useCallback(
    () => visitByIdRequest({ userId, visitId }),
    [userId, visitId]
  );

  const handleFetchSuccess = useCallback(
    (payload: Visit | null) => {
      setDetaislOfVisit(payload);
    },
    [setDetaislOfVisit]
  );

  const { fetch, isLoading, isSuccess, isError } = useFetch<Visit | null>({
    onFetch: fetchVisitDetails,
    onSuccess: handleFetchSuccess,
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { visit: detailsOfVisit, isLoading, isSuccess, isError };
};

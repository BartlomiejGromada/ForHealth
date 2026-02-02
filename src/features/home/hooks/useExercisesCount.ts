import { useFetch } from "@/hooks/useFetch";
import { useLoggedUserId } from "@/hooks/useLoggedUserId";
import { useCallback, useEffect, useState } from "react";
import { getExercisesCountRequest } from "../api/exercisesApi";
import { DateRange } from "@/types/Common";

type useExercisesCountProps = {
  range?: DateRange;
};

export default function useExercisesCount({ range }: useExercisesCountProps) {
  const userId = useLoggedUserId();

  const [count, setCount] = useState<number>(0);

  const onFetchCallback = useCallback(
    () => getExercisesCountRequest({ userId, range }),
    [userId, range]
  );

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

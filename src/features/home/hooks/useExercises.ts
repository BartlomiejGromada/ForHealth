import { useFetch } from "@/hooks/useFetch";
import { useUserId } from "@/hooks/useUserId";
import { Exercise } from "@/types/Exercise";
import { useCallback, useEffect, useState } from "react";
import { getExercisesRequest } from "../api/exercisesApi";
import { DateRange } from "@/types/Common";

type useExercisesProps = {
  count?: number;
  range?: DateRange;
};

export default function useExercises({ count, range }: useExercisesProps) {
  const userId = useUserId();

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const onFetchCallback = useCallback(
    () => getExercisesRequest({ userId, count, range }),
    [count, range, userId]
  );

  const onSuccessCallback = useCallback((payload: Exercise[]) => {
    setExercises(payload);
  }, []);

  const { fetch, isLoading, isSuccess } = useFetch<Exercise[]>({
    onFetch: onFetchCallback,
    onSuccess: onSuccessCallback,
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { exercises, isLoading, isSuccess };
}

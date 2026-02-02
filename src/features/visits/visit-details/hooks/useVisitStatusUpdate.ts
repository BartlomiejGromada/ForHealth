import { useMutation } from "@/hooks/useMutation";
import { useLoggedUserId } from "@/hooks/useLoggedUserId";
import { useAppStore } from "@/store";
import { VisitStatus } from "@/types/Visit";
import { useCallback } from "react";
import { updateVisitStatusRequest } from "../api/updateVisitStatusRequest";

type useVisitStatusUpdateProps = {
  visitId: string;
};

export const useVisitStatusUpdate = ({ visitId }: useVisitStatusUpdateProps) => {
  const userId = useLoggedUserId();
  const changeVisitStatus = useAppStore(state => state.changeVisitStatus);

  const updateVisitStatus = useCallback(
    (newStatus: VisitStatus) => updateVisitStatusRequest({ userId, visitId, newStatus }),
    [userId, visitId]
  );

  const handleMutationSuccess = useCallback(
    (newStatus: VisitStatus) => {
      changeVisitStatus(newStatus);
    },
    [changeVisitStatus]
  );

  const { mutation, isLoading, isSuccess } = useMutation({
    onMutation: updateVisitStatus,
    onSuccess: handleMutationSuccess,
  });

  return { mutation, isLoading, isSuccess };
};

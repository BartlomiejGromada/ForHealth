import { useLoggedUserId } from "@/hooks/useLoggedUserId";
import { useMutation } from "@/hooks/useMutation";
import { useAppStore } from "@/store";
import { VisitStatus } from "@/types/Visit";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { updateVisitStatusRequest } from "../api/updateVisitStatusRequest";

export const useMarkVisitAsCancelled = () => {
  const { t } = useTranslation();

  const { mutation, isLoading, isSuccess } = useVisitStatusUpdate({
    newVisitStatus: VisitStatus.Cancelled,
    onSuccessText: t("visits:visit-marked-as-cancelled"),
  });

  return { mutation, isLoading, isSuccess };
};

export const useMarkVisitAsCompleted = () => {
  const { t } = useTranslation();

  const { mutation, isLoading, isSuccess } = useVisitStatusUpdate({
    newVisitStatus: VisitStatus.Completed,
    onSuccessText: t("visits:visit-marked-as-completed"),
  });

  return { mutation, isLoading, isSuccess };
};

type useVisitStatusUpdateProps = {
  newVisitStatus: VisitStatus;
  onSuccessText: string;
};

const useVisitStatusUpdate = ({ newVisitStatus, onSuccessText }: useVisitStatusUpdateProps) => {
  const userId = useLoggedUserId();
  const changeVisitStatus = useAppStore(state => state.changeVisitStatus);

  const updateVisitStatus = useCallback(
    (visitId: string) => updateVisitStatusRequest({ userId, visitId, newStatus: newVisitStatus }),
    [userId, newVisitStatus]
  );

  const handleMutationSuccess = useCallback(() => {
    changeVisitStatus(newVisitStatus);
  }, [changeVisitStatus, newVisitStatus]);

  const { mutation, isLoading, isSuccess } = useMutation({
    onMutation: updateVisitStatus,
    onSuccess: {
      funtion: handleMutationSuccess,
      text: onSuccessText,
    },
    i18nNamespace: "visits",
  });

  return { mutation, isLoading, isSuccess };
};

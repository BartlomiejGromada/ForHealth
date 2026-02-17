import { useLoggedUserId } from "@/hooks/useLoggedUserId";
import { useAppStore } from "@/store";
import { router } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { deleteVisitByIdRequest } from "../api/deleteVisitByIdRequest";
import { useMutation } from "@/hooks/useMutation";

export const useVisitDelete = () => {
  const userId = useLoggedUserId();

  const openInformationModal = useAppStore(state => state.openInformationModal);
  const closeInformationModal = useAppStore(state => state.closeInformationModal);

  const { t } = useTranslation();

  const deleteVisitFromState = useAppStore(state => state.deleteVisit);

  const deleteVisit = useCallback(
    async (visitId: string) => {
      openInformationModal({
        title: t("visits:deleting-visit"),
        message: t("visits:deleting-visit-message"),
      });

      return await deleteVisitByIdRequest({
        userId,
        visitId,
      });
    },
    [userId, openInformationModal, t]
  );

  const handleFetchSuccess = useCallback(
    ({ visitId }: { visitId: string }) => {
      deleteVisitFromState(visitId);

      closeInformationModal();

      router.back();
    },
    [deleteVisitFromState, closeInformationModal]
  );

  const { mutation, isLoading, isSuccess } = useMutation({
    onMutation: deleteVisit,
    onSuccess: {
      funtion: handleFetchSuccess,
      text: t("visits:visit-deleted-successfully"),
    },
    i18nNamespace: "visits",
  });

  return { mutation, isLoading, isSuccess };
};

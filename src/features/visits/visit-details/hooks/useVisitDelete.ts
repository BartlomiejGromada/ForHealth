import { useMutation } from "@/hooks/useMutation";
import { useUserId } from "@/hooks/useUserId";
import { useAppStore } from "@/store";
import { router } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { deleteVisitByIdRequest } from "../api/deleteVisitByIdRequest";

type useVisitDeleteProps = {
  visitId: string;
};

export const useVisitDelete = ({ visitId }: useVisitDeleteProps) => {
  const userId = useUserId();

  const openInformationModal = useAppStore(state => state.openInformationModal);
  const closeInformationModal = useAppStore(state => state.closeInformationModal);

  const { t } = useTranslation();

  const deleteVisitFromState = useAppStore(state => state.deleteVisit);

  const deleteVisit = useCallback(async () => {
    openInformationModal({
      title: t("visits.deleting-visit"),
      message: t("visits.deleting-visit-message"),
    });

    return await deleteVisitByIdRequest({
      userId,
      visitId,
    });
  }, [userId, visitId, openInformationModal, t]);

  const handleFetchSuccess = useCallback(() => {
    deleteVisitFromState(visitId);

    closeInformationModal();

    router.back();
  }, [deleteVisitFromState, visitId, closeInformationModal]);

  const { mutation, isLoading, isSuccess } = useMutation({
    onMutation: deleteVisit,
    onSuccess: {
      funtion: handleFetchSuccess,
      text: t("visits.visit-deleted-successfully"),
    },
    i18nNamespace: "visits",
  });

  return { mutation, isLoading, isSuccess };
};

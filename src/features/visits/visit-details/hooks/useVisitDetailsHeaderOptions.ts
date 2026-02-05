import { HeaderOption } from "@/components/HeaderOptionsButton";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { ConfirmationModalContext } from "@/types/Common";
import { EditIcon, Trash2 } from "lucide-react-native";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// TODO: Delete this file - unused
type useVisitDetailsHeaderOptionsProps = {
  editVisist: {
    mutation: Function;
    isLoading: boolean;
    confirmation?: ConfirmationModalContext;
  };
  deleteVisit: {
    mutation: Function;
    isLoading: boolean;
    confirmation?: ConfirmationModalContext;
  };
};

export default function useVisitDetailsHeaderOptions({
  editVisist,
  deleteVisit,
}: useVisitDetailsHeaderOptionsProps) {
  const { t } = useTranslation();

  const headerOptions: HeaderOption[] = useMemo(
    () => [
      {
        label: t("common.edit"),
        onPress: editVisist.mutation,
        confirmation: editVisist.confirmation,
        icon: EditIcon,
        isLoading: editVisist.isLoading,
      },
      {
        label: t("common.delete"),
        onPress: deleteVisit.mutation,
        confirmation: deleteVisit.confirmation,
        icon: Trash2,
        destructive: true,
        isLoading: deleteVisit.isLoading,
      },
    ],
    [
      t,
      editVisist.mutation,
      deleteVisit.mutation,
      editVisist.isLoading,
      deleteVisit.isLoading,
      editVisist.confirmation,
      deleteVisit.confirmation,
    ]
  );

  useHeaderOptions({ options: headerOptions });
}

import ConfirmationModal from "@/components/ui/ConfirmationModal";
import TextStyled from "@/components/ui/TextStyled";
import { VisitStatus } from "@/types/Visit";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  EditIcon,
  TrashIcon,
  XIcon,
} from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import ActionButton from "../components/ActionButton";
import { useVisitUpdate } from "./hooks/useVisitUpdate";

type VisistOptionsCardProps = {
  visitId: string;
};

export default function VisistOptionsCard({ visitId }: VisistOptionsCardProps) {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onCancelVisitHandle = useCallback(() => {
    // TODO
    setIsModalVisible(true);
  }, []);

  const onRemoveVisitHandle = useCallback(() => {
    // TODO
    setIsModalVisible(true);
  }, []);

  return (
    <View className="flex bg-card-light dark:bg-card-dark p-4 rounded-lg gap-4">
      <TextStyled
        type="bold"
        className="text-xl dark:color-typography-white">{`${t("visits.additional-options")}:`}</TextStyled>

      <ActionButton
        text={t("common.edit")}
        Icon={EditIcon}
        action="basic"
        onPress={() => {
          // TODO
        }}
      />

      <ActionMenu visitId={visitId} />

      {isModalVisible && (
        <ConfirmationModal
          visible={isModalVisible}
          onConfirm={() => {}}
          onClose={() => {
            setIsModalVisible(false);
          }}
        />
      )}
    </View>
  );
}

const ActionMenu = ({ visitId }: { visitId: string }) => {
  const { t } = useTranslation();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { mutation, isLoading } = useVisitUpdate({ visitId });

  const onVisitStatusChange = useCallback(
    async (newStatus: VisitStatus) => {
      await mutation(newStatus);
      setIsMenuVisible(false);
    },
    [mutation]
  );

  return (
    <Menu
      visible={isMenuVisible}
      style={{ width: 340 }}
      anchor={
        <ActionButton
          text={t("common.actions")}
          action="basic"
          Icon={isMenuVisible ? ArrowUpIcon : ArrowDownIcon}
          onPress={() => setIsMenuVisible(true)}
        />
      }
      anchorPosition="bottom"
      mode="flat"
      onDismiss={() => {
        setIsMenuVisible(false);
      }}>
      <View className="flex gap-2">
        <ActionButton
          text={t("visits.mark-visit-as-finished")}
          Icon={CheckIcon}
          action="finish"
          buttonClassName="bg-primary-100"
          isLoading={isLoading}
          onPress={async () => await onVisitStatusChange(VisitStatus.Finished)}
        />

        <ActionButton
          text={t("visits.cancel-visit")}
          Icon={XIcon}
          action="cancel"
          buttonClassName="bg-primary-100"
          isLoading={isLoading}
          onPress={async () => await onVisitStatusChange(VisitStatus.Canceled)}
        />

        <ActionButton
          text={t("visits.remove-visit")}
          Icon={TrashIcon}
          action="remove"
          buttonClassName="bg-primary-100"
          isLoading={isLoading}
          onPress={async () => {
            //TODO: Usuń
            setIsMenuVisible(true);
          }}
        />
      </View>
    </Menu>
  );
};

import { BlurView } from "expo-blur";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalProps, View } from "react-native";
import TextStyled from "./TextStyled";
import ButtonStyled from "./ButtonStyled";

type ConfirmationModalProps = ModalProps & {
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmationModal({ visible, onConfirm, onClose }: ConfirmationModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}>
      <BlurView intensity={80} tint="regular" className="flex-1 justify-center items-center">
        <View className="flex items-center bg-card-light dark:bg-card-dark h-50 w-3/4 gap-4 p-4 rounded-md">
          <TextStyled type="bold">{t("common.are-you-sure")}</TextStyled>
          <View className="flex gap-4 w-full">
            <ButtonStyled text={t("common.yes")} onPress={onConfirm} />
            <ButtonStyled type="outlined" text={t("common.no")} onPress={onClose} />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

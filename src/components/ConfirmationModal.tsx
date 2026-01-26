import { useAppStore } from "@/store";
import { BlurView } from "expo-blur";
import { useTranslation } from "react-i18next";
import { GestureResponderEvent, Modal, Pressable, View } from "react-native";

import ButtonStyled from "./ui/ButtonStyled";
import TextStyled from "./ui/TextStyled";

export default function ConfirmationModal() {
  const { t } = useTranslation();

  const isOpenConfirmationModal = useAppStore(state => state.isOpenConfirmationModal);
  const configConfirmationModal = useAppStore(state => state.configConfirmationModal);
  const closeConfirmationModal = useAppStore(state => state.closeConfirmationModal);
  const isLoadingConfirmationModal = useAppStore(state => state.isLoadingConfirmationModal);
  const setIsLoadingConfirmationModal = useAppStore(state => state.setIsLoadingConfirmationModal);

  if (!configConfirmationModal) return null;

  const {
    title,
    message,
    confirmText = t("common.yes"),
    cancelText = t("common.no"),
    onConfirm,
  } = configConfirmationModal;

  const handleConfirm = async (e: GestureResponderEvent) => {
    setIsLoadingConfirmationModal(true);

    await onConfirm?.();

    closeConfirmationModal(e);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isOpenConfirmationModal}>
      <Pressable
        className="flex-1"
        onPress={e => {
          if (!isLoadingConfirmationModal) closeConfirmationModal(e);
        }}>
        <BlurView intensity={80} tint="regular" className="flex-1 justify-center items-center">
          <Pressable onPress={e => e.stopPropagation()}>
            <View className="bg-card-light dark:bg-card-dark w-3/4 p-4 rounded-md gap-4">
              <TextStyled type="bold">{title ?? t("common.are-you-sure")}</TextStyled>

              {message && <TextStyled>{message}</TextStyled>}

              <View className="flex gap-4">
                <ButtonStyled
                  text={confirmText}
                  type={"primary"}
                  onPress={handleConfirm}
                  isLoading={isLoadingConfirmationModal}
                  disabled={isLoadingConfirmationModal}
                />
                <ButtonStyled
                  text={cancelText}
                  type="outlined"
                  onPress={closeConfirmationModal}
                  disabled={isLoadingConfirmationModal}
                />
              </View>
            </View>
          </Pressable>
        </BlurView>
      </Pressable>
    </Modal>
  );
}

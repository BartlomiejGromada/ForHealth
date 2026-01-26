import { useAppStore } from "@/store";
import { BlurView } from "expo-blur";
import { ActivityIndicator, Modal, Pressable, View } from "react-native";

import TextStyled from "./ui/TextStyled";
import { COLORS } from "@/constants/Colors";

export default function InformationModal() {
  const isOpenInformationModal = useAppStore(state => state.isOpenInformationModal);
  const configInformationModal = useAppStore(state => state.configInformationModal);

  if (!configInformationModal) return null;

  const { title, message } = configInformationModal;

  return (
    <Modal animationType="fade" transparent visible={isOpenInformationModal}>
      <BlurView intensity={80} tint="regular" className="flex-1 justify-center items-center">
        <Pressable onPress={e => e.stopPropagation()}>
          <View className="bg-card-light dark:bg-card-dark rounded-lg p-6 flex items-center gap-4">
            <View className="flex-row items-center gap-2">
              <TextStyled type="bold" className="text-lg text-center text-primary-500">
                {title}
              </TextStyled>
              <ActivityIndicator size="small" color={COLORS.primary[500]} />
            </View>

            <TextStyled className="text-center">{message}</TextStyled>
          </View>
        </Pressable>
      </BlurView>
    </Modal>
  );
}

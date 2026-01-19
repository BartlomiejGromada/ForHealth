import TextStyled from "@/components/ui/TextStyled";
import { COLORS } from "@/constants/Colors";
import { LucideIcon, SquareActivity, StethoscopeIcon } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { FORM_TYPE } from "../types/formType";

export default function FormSelector() {
  const { t } = useTranslation();

  const [selectedForm, setSelectedForm] = useState<FORM_TYPE | undefined>();

  const onPressHandle = (formType: FORM_TYPE) => {
    setSelectedForm(formType);
  };

  return (
    <View className="gap-4">
      <View className="flex flex-row gap-2">
        <FormSelectorCard
          Icon={StethoscopeIcon}
          text={t("add.visit")}
          isSelected={selectedForm === FORM_TYPE.VISIT}
          onPress={() => onPressHandle(FORM_TYPE.VISIT)}
        />
        <FormSelectorCard
          Icon={SquareActivity}
          text={t("add.exercise")}
          isSelected={selectedForm === FORM_TYPE.EXERCISE}
          onPress={() => onPressHandle(FORM_TYPE.EXERCISE)}
        />
      </View>
    </View>
  );
}

function FormSelectorCard({
  Icon,
  text,
  isSelected,
  onPress,
}: {
  Icon: LucideIcon;
  text: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      className={`flex justify-center items-center w-1/2 h-24 gap-2 rounded-xl ${isSelected ? "bg-primary-500" : "bg-card-light dark:bg-card-dark"}`}>
      <Icon color={`${isSelected ? COLORS.white : COLORS.primary[500]}`} />
      <TextStyled className={`text-sm ${isSelected ? "color-white" : "color-typography-500"}`}>
        {text}
      </TextStyled>
    </TouchableOpacity>
  );
}

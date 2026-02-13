import IconStyled, { IconName } from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
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
          icon={"Stethoscope"}
          text={t("add:visit")}
          isSelected={selectedForm === FORM_TYPE.VISIT}
          onPress={() => onPressHandle(FORM_TYPE.VISIT)}
        />
        <FormSelectorCard
          icon={"SquareActivity"}
          text={t("add:exercise")}
          isSelected={selectedForm === FORM_TYPE.EXERCISE}
          onPress={() => onPressHandle(FORM_TYPE.EXERCISE)}
        />
      </View>
    </View>
  );
}

function FormSelectorCard({
  icon,
  text,
  isSelected,
  onPress,
}: {
  icon: IconName;
  text: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="flex-1">
      {({ pressed }) => (
        <View
          className={`flex justify-center items-center w-full h-24 gap-2 rounded-md border ${isSelected ? "border-2 bg-card border-button-primary" : "bg-card border-border"}`}
          style={{ opacity: pressed ? 0.8 : 1 }}>
          <IconStyled
            name={icon}
            className={isSelected ? "text-foreground" : "text-card-foreground"}
          />

          <TextStyled
            className={`${isSelected ? "text-foreground" : "font-normal text-card-foreground"}`}>
            {text}
          </TextStyled>
        </View>
      )}
    </Pressable>
  );
}

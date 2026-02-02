import clsx from "clsx";
import React from "react";
import { Pressable, PressableProps, View } from "react-native";
import TextStyled, { TextType } from "./TextStyled";

type TextPressableProps = PressableProps & {
  text: string;
  type?: TextType;
  classNameText?: string;
};

export default function TextPressable({
  text,
  type = "regular",
  classNameText,
  ...rest
}: TextPressableProps) {
  return (
    <Pressable {...rest}>
      {({ pressed }) => (
        <View style={{ opacity: pressed ? 0.6 : 1 }}>
          <TextStyled className={clsx("color-primary-500", classNameText)} type={type}>
            {text}
          </TextStyled>
        </View>
      )}
    </Pressable>
  );
}

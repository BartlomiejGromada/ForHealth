import IconStyled from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import React from "react";
import { View } from "react-native";

export default function Badge() {
  const user = useLoggedUser();

  const fullName = `${user!.details.firstName ?? ""} ${user!.details.lastName ?? ""}`;

  return (
    <View className="flex justify-center items-center gap-2">
      <View className="flex justify-center items-center rounded-full bg-icon-background w-24 h-24">
        <IconStyled name="User" size={64} />
      </View>
      <View className="flex items-center justify-center">
        <TextStyled variant="heading" className="text-xl">
          {fullName ?? ""}
        </TextStyled>
        <TextStyled variant="caption">{user!.email}</TextStyled>
      </View>
    </View>
  );
}

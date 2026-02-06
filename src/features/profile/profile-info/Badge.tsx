import TextStyled from "@/components/ui/TextStyled";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { UserIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function Badge() {
  const user = useLoggedUser();

  const fullName = `${user!.details.firstName ?? ""} ${user!.details.lastName ?? ""}`;

  return (
    <View className="flex justify-center items-center gap-2">
      <View className="flex justify-center items-center rounded-full bg-primary-200 w-24 h-24">
        {/* <UserIcon color={COLORS.primary[500]} size={35} /> */}
      </View>
      <View className="flex items-center justify-center">
        <TextStyled className="text-xl dark:text-typography-white">{fullName ?? ""}</TextStyled>
        <TextStyled className="text-typography-400">{user!.email}</TextStyled>
      </View>
    </View>
  );
}

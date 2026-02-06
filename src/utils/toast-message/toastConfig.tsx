import IconStyled from "@/components/ui/IconStyled";
import { THEME_TOKENS } from "@/constants/ThemeTokens";
import { View } from "react-native";
import { BaseToast, ErrorToast, ToastConfigParams } from "react-native-toast-message";

type StyledToastProps = ToastConfigParams<{ theme: "light" | "dark" }>;

export const toastConfig = {
  success: (props: StyledToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: THEME_TOKENS.card.primary,
        borderLeftColor: THEME_TOKENS.card.border,
      }}
      renderLeadingIcon={() => (
        <View className="flex items-center justify-center p-2">
          <IconStyled
            name={"CircleCheck"}
            // fill={
            //   props.props.theme === "dark" ? THEME_TOKENS.card.border : THEME_TOKENS.card.border
            // }
          />
        </View>
      )}
      text2NumberOfLines={3}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        color: THEME_TOKENS.primary,
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: "400",
        color: THEME_TOKENS.primary,
      }}
    />
  ),
  error: (props: StyledToastProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: THEME_TOKENS.primary,
        borderLeftColor: THEME_TOKENS.primary,
      }}
      renderLeadingIcon={() => (
        <View className="flex items-center justify-center p-2">
          <IconStyled
            name={"CircleCheck"}
            // fill={
            //   props.props.theme === "dark" ? THEME_TOKENS.card.border : THEME_TOKENS.card.border
            // }
          />
        </View>
      )}
      text2NumberOfLines={3}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        color: THEME_TOKENS.primary,
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: "400",
        color: THEME_TOKENS.primary,
      }}
    />
  ),
};

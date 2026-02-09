import IconStyled from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import { View } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";

type StyledToastProps = ToastConfigParams<{
  text1: string;
  text2?: string;
}>;

export const toastConfig = {
  success: ({ text1, text2 }: StyledToastProps) => (
    <View className="flex-row items-center bg-card border-l-4 border-success px-4 py-3">
      <IconStyled name="CircleCheck" size={20} className="text-success " />

      <View className="ml-3 flex-1">
        <TextStyled className="text-foreground">{text1}</TextStyled>
        {text2 && (
          <TextStyled variant="caption" className="mt-1 text-sm text-foreground-muted">
            {text2}
          </TextStyled>
        )}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: StyledToastProps) => (
    <View className="flex-row items-center bg-card border-l-4 border-destructive px-4 py-3">
      <IconStyled name="CircleX" size={20} className="text-destructive" />

      <View className="ml-3 flex-1">
        <TextStyled className="text-destructive">{text1}</TextStyled>

        {text2 && (
          <TextStyled variant="caption" className="mt-1 text-sm text-destructive-foreground">
            {text2}
          </TextStyled>
        )}
      </View>
    </View>
  ),
};

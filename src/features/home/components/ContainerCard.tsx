import IconStyled, { IconName } from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import { GestureResponderEvent, Pressable, View } from "react-native";

export type ContainerCardProps = {
  icon: IconName;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  accessibilityLabel: string;
  accessibilityHint: string;
  onPress: (event: GestureResponderEvent) => void;
};

export function ContainerCard({
  icon,
  title,
  subtitle,
  description,
  accessibilityHint,
  accessibilityLabel,
  onPress,
}: ContainerCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}>
      {({ pressed }) => (
        <View
          className="w-full flex flex-row items-center rounded-md py-2 gap-2 bg-card"
          style={{ opacity: pressed ? 0.6 : 1 }}>
          <View className="flex items-center justify-center rounded-full p-4">
            <IconStyled name={icon} size={24} />
          </View>

          <View className="w-full gap-1">
            <TextStyled className="color-foreground">{title}</TextStyled>
            <TextStyled variant="caption" className="color-foreground-muted">
              {subtitle}
            </TextStyled>

            <TextStyled variant="caption" className="color-foreground-muted">
              {description}
            </TextStyled>
          </View>
        </View>
      )}
    </Pressable>
  );
}

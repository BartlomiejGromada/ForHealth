import TextStyled from "@/components/ui/TextStyled";
import { LucideIcon } from "lucide-react-native";
import { GestureResponderEvent, Pressable, View } from "react-native";

export type ContainerCardProps = {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  accessibilityLabel: string;
  accessibilityHint: string;
  onPress: (event: GestureResponderEvent) => void;
};

export function ContainerCard({
  Icon,
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
          className="w-full flex flex-row items-center rounded-lg gap-x-4 bg-card-light p-4 dark:bg-card-dark"
          style={{ opacity: pressed ? 0.6 : 1 }}>
          <View className="flex items-center justify-center bg-primary-200 rounded-full p-4">
            {/* <Icon color={COLORS.primary[500]} /> */}
          </View>

          <View className="w-full">
            <TextStyled className="text-md dark:text-typography-white">{title}</TextStyled>
            <TextStyled className="text-sm color-typography-500">{subtitle}</TextStyled>
            {description}
          </View>
        </View>
      )}
    </Pressable>
  );
}

import TextStyled from "@/components/ui/TextStyled";
import { COLORS } from "@/constants/Colors";
import { LucideIcon } from "lucide-react-native";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";

export type ContainerCardProps = {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
};

export function ContainerCard({ Icon, title, subtitle, description, onPress }: ContainerCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View className="w-full flex flex-row items-center rounded-lg gap-x-4 bg-card-light p-4 dark:bg-card-dark">
        <View className="flex items-center justify-center bg-primary-200 rounded-full p-4">
          <Icon color={COLORS.primary[500]} />
        </View>
        <View className="w-full">
          <TextStyled type="bold" className="text-md dark:text-typography-white">
            {title}
          </TextStyled>
          <TextStyled className="text-sm color-typography-500">{subtitle}</TextStyled>
          {description}
        </View>
      </View>
    </TouchableOpacity>
  );
}

import { COLORS } from "@/constants/Colors";
import { LucideIcon, MoreVerticalIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AnimatedPressable } from "./ui/AnimatedPressable";

export type FloatingActionButtonElement = {
  index: number;
  text: string;
  icon: LucideIcon;
};

type FloatingActionButtonProps = {
  items: FloatingActionButtonElement[];
};

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

export const FloatingActionButton = ({ items }: FloatingActionButtonProps) => {
  const isExpandedSharedValue = useSharedValue(false);
  const handlePress = () => {
    isExpandedSharedValue.value = !isExpandedSharedValue.value;
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(isExpandedSharedValue.value ? 140 : 52),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(isExpandedSharedValue.value ? 0 : 25) },
        { rotate: withTiming(isExpandedSharedValue.value ? "90deg" : "0deg") },
      ],
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpandedSharedValue.value ? 1 : 0),
      transform: [
        {
          translateX: withTiming(isExpandedSharedValue.value ? 0 : -10),
        },
      ],
    };
  });

  return (
    <View className="absolute bottom-6 right-6 z-50 items-center">
      <AnimatedPressable
        onPress={handlePress}
        style={containerStyle}
        hitSlop={6}
        className="h-14 rounded-full bg-secondary-600 flex-row items-center justify-center overflow-hidden shadow-md shadow-black/20">
        <Animated.View style={iconStyle}>
          <MoreVerticalIcon color={COLORS.primary[100]} />
        </Animated.View>

        <Animated.Text style={labelStyle} className="ml-3 text-primary-100">
          {"Opcje"}
        </Animated.Text>
      </AnimatedPressable>

      {items.map(item => (
        <FloatingActionButtonItem key={item.index} item={item} isExpanded={isExpandedSharedValue} />
      ))}
    </View>
  );
};

type FloatingActionButtonItemProps = {
  isExpanded: SharedValue<boolean>;
  item: FloatingActionButtonElement;
};

export const FloatingActionButtonItem = ({
  isExpanded,
  item: { index, text, icon: Icon },
}: FloatingActionButtonItemProps) => {
  const containerStyle = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;

    return {
      transform: [
        { translateY: withSpring(-moveValue, SPRING_CONFIG) },
        { scale: withTiming(isExpanded.value ? 1 : 0) },
      ],
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const delay = index * 80;
    return {
      opacity: withDelay(delay, withTiming(isExpanded.value ? 1 : 0)),
      transform: [
        {
          translateX: withDelay(delay, withTiming(isExpanded.value ? 0 : 20)),
        },
      ],
    };
  });

  return (
    <View className="absolute bottom-6 z-20">
      <AnimatedPressable
        style={containerStyle}
        className="flex-row items-center"
        onPress={() => {
          console.log("Test", text);
        }}>
        <Animated.View
          style={labelStyle}
          className="mr-3 px-3 py-2 rounded-full shadow-md shadow-black/20">
          <Animated.Text className="text-sm text-secondary-500 text-center">{text}</Animated.Text>
        </Animated.View>

        <View className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center shadow-md shadow-black/20 border border-secondary-500">
          <Icon color={COLORS.secondary[100]} size={18} />
        </View>
      </AnimatedPressable>
    </View>
  );
};

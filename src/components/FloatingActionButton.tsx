import { THEME_TOKENS } from "@/constants/ThemeTokens";
import { useAppTheme } from "@/providers/ThemeProvider";
import { clsx } from "clsx";
import { LucideIcon, MoreVerticalIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  TextProps,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import TextStyled from "./ui/TextStyled";

export type FabItemVariant = keyof typeof fabItemStyles;

export type FloatingActionButtonElement = PressableProps & {
  onPressAsync: (e: GestureResponderEvent) => Promise<void>;
  text: TextProps & {
    value: string;
  };
  icon: {
    type: LucideIcon;
    variant?: FabItemVariant;
  };
};

type FloatingActionButtonProps = PressableProps & {
  text?: string;
  items: FloatingActionButtonElement[];
  isLoading?: boolean;
};

const OFFSET = 60;

const FAB_OPEN_WIDTH = 160;
const FAB_CLOSED_WIDTH = 52;

const ICON_DURATION = 200;
const LABEL_DURATION = 150;
const FAB_DURATION = 200;

export const FloatingActionButton = ({
  text,
  items,
  isLoading,
  ...rest
}: FloatingActionButtonProps) => {
  const { t } = useTranslation();

  const { theme } = useAppTheme();

  const fabProgress = useSharedValue(0); // 0 - closed, 1 - open
  const iconsProgress = useSharedValue(0); // item icons
  const labelsProgress = useSharedValue(0); // item labels

  const toggleFab = () => {
    if (fabProgress.value === 0) {
      fabProgress.value = withTiming(1, { duration: FAB_DURATION });
      iconsProgress.value = withTiming(1, { duration: ICON_DURATION });
      labelsProgress.value = withDelay(ICON_DURATION, withTiming(1, { duration: LABEL_DURATION }));
    } else {
      closeFab();
    }
  };

  const fabStyle = useAnimatedStyle(() => ({
    width: interpolate(fabProgress.value, [0, 1], [FAB_CLOSED_WIDTH, FAB_OPEN_WIDTH]),
  }));

  const fabIconStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(fabProgress.value, [0, 1], [25, 0]) },
      {
        rotate: `${interpolate(fabProgress.value, [0, 1], [0, 90])}deg`,
      },
    ],
  }));

  const fabLabelStyle = useAnimatedStyle(() => ({
    opacity: fabProgress.value,
    transform: [
      {
        translateX: interpolate(fabProgress.value, [0, 1], [-10, 0]),
      },
    ],
  }));

  const closeFab = () => {
    labelsProgress.value = withTiming(0, { duration: LABEL_DURATION });

    iconsProgress.value = withDelay(LABEL_DURATION, withTiming(0, { duration: ICON_DURATION }));

    fabProgress.value = withDelay(
      LABEL_DURATION + ICON_DURATION,
      withTiming(0, { duration: FAB_DURATION })
    );
  };

  return (
    <>
      <Pressable {...rest} onPress={toggleFab} hitSlop={8} accessibilityRole="button">
        {({ pressed }) => (
          <Animated.View
            style={[fabStyle, { opacity: pressed ? 0.8 : 1 }]}
            className={
              "bg-background-100 h-14 rounded-full bg-primary-300 flex-row items-center justify-center overflow-hidden shadow-md shadow-black/20"
            }>
            <Animated.View style={fabIconStyle}>
              {isLoading ? (
                <ActivityIndicator color={THEME_TOKENS.secondary} />
              ) : (
                <MoreVerticalIcon color={THEME_TOKENS.secondary} />
              )}
            </Animated.View>

            <Animated.Text
              style={fabLabelStyle}
              className={clsx("ml-3 font-bold text-white", text)}>
              {text ?? t("common.actions")}
            </Animated.Text>
          </Animated.View>
        )}
      </Pressable>

      {items.map((item, index) => (
        <FloatingActionButtonItem
          index={index + 1}
          key={index}
          item={item}
          onPressAsync={async (e: GestureResponderEvent) => {
            if (fabProgress.value === 0) return;

            toggleFab();
            await item.onPressAsync!(e);
          }}
          iconsProgress={iconsProgress}
          labelsProgress={labelsProgress}
        />
      ))}
    </>
  );
};

type FloatingActionButtonItemProps = {
  index: number;
  item: FloatingActionButtonElement;
  onPressAsync: (e: GestureResponderEvent) => Promise<void>;
  iconsProgress: SharedValue<number>;
  labelsProgress: SharedValue<number>;
};

const fabItemStyles = {
  default: {
    icon: "bg-white border border-primary-300",
    iconColor: "todo",
    label: "bg-border-50",
    labelText: "text-typography-500",
  },
  danger: {
    icon: "bg-white border border-red-300",
    iconColor: "todo",
    label: "bg-border-50",
    labelText: "text-typography-500",
  },
  success: {
    icon: "bg-white border border-green-300",
    iconColor: "todo",
    label: "bg-green-50",
    labelText: "text-green-700",
  },
} as const;

const FloatingActionButtonItem = ({
  index,
  item,
  onPressAsync,
  iconsProgress,
  labelsProgress,
}: FloatingActionButtonItemProps) => {
  const variant = item.icon.variant ?? "default";
  const styles = fabItemStyles[variant];

  const containerStyle = useAnimatedStyle(() => {
    const move = OFFSET * index;

    return {
      position: "absolute",
      bottom: 35,
      right: 30,
      transform: [
        {
          translateY: interpolate(iconsProgress.value, [0, 1], [0, -move]),
        },
        {
          scale: interpolate(iconsProgress.value, [0, 1], [1, 1]),
        },
      ],
    };
  });

  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelsProgress.value,
    transform: [
      {
        translateX: interpolate(labelsProgress.value, [0, 1], [0, -20]),
      },
    ],
  }));

  return (
    <Animated.View style={containerStyle}>
      <Pressable onPress={onPressAsync} hitSlop={6} accessibilityRole="button">
        {({ pressed }) => (
          <View className="flex-row items-center" style={{ opacity: pressed ? 0.6 : 1 }}>
            <Animated.View
              style={labelStyle}
              className={clsx("px-3 py-2 rounded-full shadow-md shadow-black/10", styles.label)}>
              <TextStyled
                className={clsx("text-sm text-center", styles.labelText)}
                numberOfLines={1}>
                {item.text.value}
              </TextStyled>
            </Animated.View>

            <View
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-md shadow-black/10",
                styles.icon
              )}>
              <item.icon.type size={18} color={styles.iconColor} />
            </View>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

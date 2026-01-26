import { COLORS } from "@/constants/Colors";
import { useAppStore } from "@/store";
import { ConfirmationModalContext } from "@/types/Common";
import { LucideIcon, MoreVertical } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionSheetIOS, Platform, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import TextStyled from "./ui/TextStyled";

export type HeaderOption = {
  label: string;
  onPress: Function;
  confirmation?: ConfirmationModalContext;
  icon?: LucideIcon;
  destructive?: boolean;
  isLoading?: boolean;
};

type HeaderOptionsButtonProps = {
  options: HeaderOption[];
};

export default function HeaderOptionsButton({ options }: HeaderOptionsButtonProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const openMenu = () => {
    if (!options.length) return;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options.map(o => o.label), t("common.cancel")],
          cancelButtonIndex: options.length,
          destructiveButtonIndex: options.findIndex(o => o.destructive),
        },
        async buttonIndex => {
          const option = options[buttonIndex];
          await option?.onPress();
        }
      );
    } else {
      setVisible(true);
    }
  };

  const isAnyOptionLoading = options.filter(o => o.isLoading).length > 0;

  return (
    <Menu
      style={{ marginTop: 4 }}
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentStyle={{ backgroundColor: "white", marginRight: 8 }}
      anchor={
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={openMenu}
          hitSlop={10}
          disabled={isAnyOptionLoading}>
          <MoreVertical size={22} />
        </TouchableOpacity>
      }
      anchorPosition="bottom">
      {options.map((o, index) => (
        <MenuItemStyled
          key={o.label}
          option={o}
          isLoading={o.isLoading}
          onDismiss={() => setVisible(false)}
          isLast={index === options.length - 1}
        />
      ))}
    </Menu>
  );
}

type MenuItemProps = {
  option: HeaderOption;
  onDismiss: () => void;
  isLast: boolean;
  isLoading?: boolean;
};

const MenuItemStyled = ({ option, onDismiss, isLast, isLoading }: MenuItemProps) => {
  const Icon = option.icon;

  const openConfirmation = useAppStore(state => state.openConfirmationModal);

  return (
    <View className="bg-white">
      <TouchableOpacity
        disabled={isLoading}
        activeOpacity={0.6}
        onPress={async () => {
          onDismiss();

          if (option.confirmation) {
            openConfirmation({
              title: option.confirmation.title,
              message: option.confirmation.message,
              onConfirm: async () => await option.onPress(),
            });
          } else {
            await option.onPress();
          }
        }}
        className="flex-row items-center px-6 py-4">
        {Icon && (
          <View className="mr-3 w-6 items-center">
            <Icon size={20} color={option.destructive ? "red" : COLORS.black} />
          </View>
        )}
        <TextStyled
          className={`${option.destructive ? "text-red-600" : "text-black"} text-[14px]`}
          style={{ marginLeft: Icon ? -4 : 0 }}>
          {option.label}
        </TextStyled>
      </TouchableOpacity>

      {!isLast && (
        <View
          className="h-[1px] bg-gray-100"
          style={{
            marginHorizontal: 6,
            opacity: 0.6,
          }}
        />
      )}
    </View>
  );
};

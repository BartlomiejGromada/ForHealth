import { LucideIcon, MoreVertical } from "lucide-react-native";
import { useState } from "react";
import { ActionSheetIOS, Platform, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import TextStyled from "./ui/TextStyled";
import { COLORS } from "@/constants/Colors";

export type HeaderOption = {
  label: string;
  onPress: () => void;
  icon?: LucideIcon;
  destructive?: boolean;
};

type HeaderOptionsButtonProps = {
  options: HeaderOption[];
};

export default function HeaderOptionsButton({ options }: HeaderOptionsButtonProps) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    if (!options.length) return;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options.map(o => o.label), "Anuluj"],
          cancelButtonIndex: options.length,
          destructiveButtonIndex: options.findIndex(o => o.destructive),
        },
        buttonIndex => {
          const option = options[buttonIndex];
          option?.onPress();
        }
      );
    } else {
      setVisible(true);
    }
  };

  return (
    <Menu
      style={{ marginTop: 4 }}
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentStyle={{ backgroundColor: "white", marginRight: 8 }}
      anchor={
        <TouchableOpacity activeOpacity={0.6} onPress={openMenu} hitSlop={10}>
          <MoreVertical size={22} />
        </TouchableOpacity>
      }
      anchorPosition="bottom">
      {options.map((o, index) => (
        <MenuItemStyled
          key={o.label}
          option={o}
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
};

const MenuItemStyled = ({ option, onDismiss, isLast }: MenuItemProps) => {
  const Icon = option.icon;

  return (
    <View className="bg-white">
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          onDismiss();
          option.onPress();
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

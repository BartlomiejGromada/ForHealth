import { useHeaderOptions } from "@/contexts/HeaderOptionsContext";
import { MoreVertical } from "lucide-react-native";
import { useState } from "react";
import { ActionSheetIOS, Platform, Pressable } from "react-native";
import { Menu } from "react-native-paper";

export default function HeaderOptionsButton() {
  const { options } = useHeaderOptions();

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
      contentStyle={{ backgroundColor: "white" }}
      anchor={
        <Pressable onPress={openMenu} hitSlop={10}>
          <MoreVertical size={22} />
        </Pressable>
      }
      anchorPosition="bottom">
      {options.map(o => (
        <Menu.Item
          style={{ backgroundColor: "white" }}
          key={o.label}
          onPress={() => {
            setVisible(false);
            o.onPress();
          }}
          title={o.label}
        />
      ))}
    </Menu>
  );
}

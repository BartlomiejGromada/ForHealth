import HeaderOptionsButton, { HeaderOption } from "@/components/HeaderOptionsButton";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

type useHeaderOptionsProps = { options: HeaderOption[] };

export default function useHeaderOptions({ options }: useHeaderOptionsProps) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (options.length > 0) {
      navigation.setOptions({
        headerRight: () => <HeaderOptionsButton options={options} />,
      });
    } else {
      navigation.setOptions({
        headerRight: null,
      });
    }
  }, [navigation, options]);
}

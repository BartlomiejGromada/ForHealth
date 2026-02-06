import { icons } from "lucide-react-native";
import { cssInterop } from "nativewind";
import React, { useMemo } from "react";

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

const IconStyled: React.FC<IconProps> = React.memo(
  ({ name, className = "text-icon-foreground", ...rest }) => {
    const CustomIcon = useMemo(() => {
      const BaseIcon = icons[name];

      const WrappedIcon = cssInterop(BaseIcon, {
        className: {
          target: "style",
          nativeStyleToProp: {
            color: true,
            width: true,
            height: true,
          },
        },
      });

      WrappedIcon.displayName = `Icon(${name})`;

      return WrappedIcon;
    }, [name]);

    return <CustomIcon className={className} {...rest} />;
  }
);

IconStyled.displayName = "Icon";

export default IconStyled;

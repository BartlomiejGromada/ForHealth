import { COLORS } from "@/constants/Colors";
import { LucideIcon } from "lucide-react-native";

export type IconStyledVaraint = keyof typeof iconVariants;

type IconStyledProps = {
  icon: LucideIcon;
  variant?: IconStyledVaraint;
  size?: number;
};

const iconVariants = {
  default: {
    color: COLORS.primary[500],
  },
  danger: {
    color: COLORS.error.dark,
  },
  success: {
    color: COLORS.primary[500],
  },
  muted: {
    color: COLORS.typography[500],
  },
} as const;

export function IconStyled({ icon: Icon, variant = "default", size = 18 }: IconStyledProps) {
  const styles = iconVariants[variant];

  return <Icon size={size} color={styles.color} />;
}

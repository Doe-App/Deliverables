import { View, type ViewProps } from "react-native";
import { useTheme } from "@/constants/theme-provider";

type Surface = "base" | "surface" | "overlay" | "muted";

export type ThemedViewProps = ViewProps & {
  surface?: Surface;
};

export function ThemedView({
  style,
  surface = "base",
  ...otherProps
}: ThemedViewProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[{ backgroundColor: colors.bg[surface] }, style]}
      {...otherProps}
    />
  );
}

import { View, type ViewProps, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme-provider";
import { radius, borderWidth } from "@/constants/theme";

type GlassyCardProps = ViewProps & {
  padding?: number;
};

export function GlassyCard({ style, padding = 16, children, ...props }: GlassyCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.bg.overlay,
          borderColor: "rgba(255, 255, 255, 0.18)",
          padding,
          shadowColor: colors.fg.primary,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: borderWidth.thin,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
});

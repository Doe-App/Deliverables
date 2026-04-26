import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/constants/theme-provider";
import { spacing, radius, borderWidth } from "@/constants/theme";

type ButtonVariant = "primary" | "default" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
};

export function Button({
  onPress,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
}: ButtonProps) {
  const { colors } = useTheme();

  const variantStyles = {
    primary: {
      backgroundColor: colors.accent.base,
      borderWidth: 0,
      borderColor: "transparent",
      textColor: colors.accent.text,
    },
    default: {
      backgroundColor: colors.bg.surface,
      borderWidth: borderWidth.default,
      borderColor: colors.border.default,
      textColor: colors.fg.primary,
    },
    destructive: {
      backgroundColor: colors.semantic.destructive,
      borderWidth: 0,
      borderColor: "transparent",
      textColor: colors.fg.inverse,
    },
  }[variant];

  const sizeStyles = {
    sm: {
      paddingHorizontal: spacing.md,
      paddingVertical:   spacing.xs,
      borderRadius:      radius.sm,
    },
    md: {
      paddingHorizontal: spacing.lg,
      paddingVertical:   spacing.sm,
      borderRadius:      radius.md,
    },
    lg: {
      paddingHorizontal: spacing.xl,
      paddingVertical:   spacing.md,
      borderRadius:      radius.lg,
    },
  }[size];

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => (
        <View
          style={[
            styles.button,
            sizeStyles,
            {
              backgroundColor: variantStyles.backgroundColor,
              borderWidth:     variantStyles.borderWidth,
              borderColor:     variantStyles.borderColor,
              opacity:         disabled ? 0.4 : pressed ? 0.75 : 1,
            },
          ]}
        >
          <ThemedText type="label" style={{ color: variantStyles.textColor }}>
            {title}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems:     "center",
    justifyContent: "center",
  },
});

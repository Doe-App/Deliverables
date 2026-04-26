import { Text, type TextProps, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme-provider";
import { fonts, fontSize, lineHeight, fontWeight } from "@/constants/theme";

export type ThemedTextType =
  | "title"      // Fraunces 900, 48px — screen-level heading
  | "subtitle"   // Fraunces 900, 32px — section heading
  | "body"       // Gabarito 400, 14px — default body
  | "bodyMd"     // Gabarito 400, 16px — medium body
  | "bodyLg"     // Gabarito 400, 20px — large body / intro
  | "label"      // Gabarito Bold 700, 12px — labels, button text
  | "mono"       // IBM Plex Mono 400, 14px — code / monospace
  | "serif"      // Lora 400, 14px — editorial serif body
  | "caption"    // Lora 400, 12px — secondary/meta text
  | "link";      // Gabarito 400, 14px — accent color

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
};

export function ThemedText({
  style,
  type = "body",
  ...rest
}: ThemedTextProps) {
  const { colors } = useTheme();

  const isLink = type === "link";

  return (
    <Text
      style={[
        { color: isLink ? colors.accent.base : colors.fg.primary },
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.display,
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight.title,
    fontWeight: fontWeight.black,
  },
  subtitle: {
    fontFamily: fonts.display,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight.subtitle,
    fontWeight: fontWeight.black,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: fontSize.base,
    lineHeight: lineHeight.body,
    fontWeight: fontWeight.regular,
  },
  bodyMd: {
    fontFamily: fonts.sans,
    fontSize: fontSize.md,
    lineHeight: lineHeight.bodyMd,
    fontWeight: fontWeight.regular,
  },
  bodyLg: {
    fontFamily: fonts.sans,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.bodyLg,
    fontWeight: fontWeight.regular,
  },
  caption: {
    fontFamily: fonts.serif,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.caption,
    fontWeight: fontWeight.regular,
  },
  label: {
    fontFamily: fonts.sansBold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.caption,
    fontWeight: fontWeight.bold,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: fontSize.base,
    lineHeight: lineHeight.mono,
    fontWeight: fontWeight.regular,
  },
  serif: {
    fontFamily: fonts.serif,
    fontSize: fontSize.base,
    lineHeight: lineHeight.body,
    fontWeight: fontWeight.regular,
  },
  link: {
    fontFamily: fonts.sans,
    fontSize: fontSize.base,
    lineHeight: lineHeight.body,
    fontWeight: fontWeight.regular,
  },
});

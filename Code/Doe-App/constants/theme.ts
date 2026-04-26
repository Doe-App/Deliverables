import doe from "./themes/doe";
import chocolate from "./themes/chocolate";
import space from "./themes/space";
import sage from "./themes/sage";
import celestial from "./themes/celestial";
import type { PremadeThemeId, Theme, UserThemeSettings } from "@/types/theme";

export type {
  Theme,
  ThemeColors,
  BgColors,
  FgColors,
  BorderColors,
  AccentColors,
  SemanticColors,
  ToggleColors,
  CycleRingColors,
  CyclePhaseColors,
  LightThemeId,
  DarkThemeId,
  PremadeThemeId,
  UserThemeSettings,
} from "@/types/theme";
export { LIGHT_THEME_IDS, DARK_THEME_IDS, PREMADE_THEME_IDS } from "@/types/theme";

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, "2xl": 24, "3xl": 32 } as const;
export const radius = { sm: 8, md: 12, lg: 16, xl: 20, full: 9999 } as const;
export const shadowBlur = { sm: 3, md: 12, lg: 24 } as const;
export const fonts = {
  display: "Fraunces",
  serif: "Lora",
  sans: "Gabarito",
  sansBold: "Gabarito-Bold",
  mono: "IBM Plex Mono",
} as const;
export const borderWidth = { thin: 0.5, default: 1, thick: 2.5 } as const;

// Typography scale — derived from figma/Typography.json
export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
} as const;

export const lineHeight = {
  title: 52,
  subtitle: 38,
  heading: 28,
  body: 21,
  bodyMd: 24,
  bodyLg: 30,
  caption: 18,
  mono: 21,
} as const;

export const fontWeight = {
  regular: "400" as const,
  semibold: "600" as const,
  bold: "700" as const,
  black: "900" as const,
};

export const PREMADE_THEMES: Record<PremadeThemeId, Theme> = {
  doe,
  sage,
  celestial,
  space,
  chocolate,
};

export const defaultThemeSettings: UserThemeSettings = {
  colorSchemeMode: "system",
  lightTheme: "doe",
  darkTheme: "space",
};

export function getTheme(themeId: PremadeThemeId): Theme {
  return PREMADE_THEMES[themeId];
}

/** Parse a hex color (#RGB or #RRGGBB) and return an rgba string at the given opacity (0-1). */
export function withAlpha(hex: string, opacity: number): string {
  const h = hex.replace("#", "");
  const parse = h.length === 3
    ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
    : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  return `rgba(${parse[0]}, ${parse[1]}, ${parse[2]}, ${opacity})`;
}

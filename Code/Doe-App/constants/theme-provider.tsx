import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { PREMADE_THEMES, type Theme } from "./theme";
import { useThemeSettings } from "@/store/use-theme-settings";

export type { Theme, BgColors, FgColors, BorderColors, AccentColors, SemanticColors, ToggleColors, CycleRingColors, CyclePhaseColors } from "./theme";
export { PREMADE_THEME_IDS, LIGHT_THEME_IDS, DARK_THEME_IDS } from "./theme";
export type { PremadeThemeId, LightThemeId, DarkThemeId } from "./theme";

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: PREMADE_THEMES.doe,
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const deviceScheme = useColorScheme() ?? "light";
  const { settings } = useThemeSettings();

  const effectiveScheme =
    settings.colorSchemeMode === "system" ? deviceScheme : settings.colorSchemeMode;

  const themeId =
    effectiveScheme === "dark" ? settings.darkTheme : settings.lightTheme;

  const theme = PREMADE_THEMES[themeId];

  return React.createElement(ThemeContext.Provider, { value: { theme } }, children);
}

export function useTheme(): Theme {
  return useContext(ThemeContext).theme;
}

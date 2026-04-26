import { create } from "zustand";
import { defaultThemeSettings, type LightThemeId, type DarkThemeId } from "@/constants/theme";
import {
  loadThemeSettings,
  saveThemeSettings,
  type ThemeSettings,
} from "@/services/theme-settings";

interface ThemeSettingsStore {
  settings: ThemeSettings;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setLightTheme: (id: LightThemeId) => void;
  setDarkTheme: (id: DarkThemeId) => void;
  setColorSchemeMode: (mode: ThemeSettings["colorSchemeMode"]) => void;
}

export const useThemeSettings = create<ThemeSettingsStore>((set, get) => ({
  settings: defaultThemeSettings,
  hydrated: false,

  hydrate: async () => {
    const settings = await loadThemeSettings();
    set({ settings, hydrated: true });
  },

  setLightTheme: (lightTheme) => {
    const next = { ...get().settings, lightTheme };
    set({ settings: next });
    saveThemeSettings(next).catch(console.error);
  },

  setDarkTheme: (darkTheme) => {
    const next = { ...get().settings, darkTheme };
    set({ settings: next });
    saveThemeSettings(next).catch(console.error);
  },

  setColorSchemeMode: (colorSchemeMode) => {
    const next = { ...get().settings, colorSchemeMode };
    set({ settings: next });
    saveThemeSettings(next).catch(console.error);
  },
}));

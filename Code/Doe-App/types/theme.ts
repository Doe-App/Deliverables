export const LIGHT_THEME_IDS = ["doe", "sage", "celestial"] as const;
export const DARK_THEME_IDS = ["space", "chocolate"] as const;
export const PREMADE_THEME_IDS = [...LIGHT_THEME_IDS, ...DARK_THEME_IDS] as const;

export type LightThemeId = (typeof LIGHT_THEME_IDS)[number];
export type DarkThemeId = (typeof DARK_THEME_IDS)[number];
export type PremadeThemeId = (typeof PREMADE_THEME_IDS)[number];

export interface BgColors {
  base: string;
  surface: string;
  surfaceHover: string;
  overlay: string;
  muted: string;
}

export interface FgColors {
  primary: string;
  secondary: string;
  tertiary: string;
  inverse: string;
  muted: string;
}

export interface BorderColors {
  default: string;
  subtle: string;
  strong: string;
  accent: string;
}

export interface AccentColors {
  base: string;
  muted: string;
  text: string;
}

export interface SemanticColors {
  success: string;
  successFg: string;
  destructive: string;
  destructiveMuted: string;
  info: string;
  infoMuted: string;
}

export interface ToggleColors {
  on: string;
  onThumb: string;
  off: string;
  offThumb: string;
}

export interface CycleRingColors {
  outer: string;
  inner: string;
  center: string;
  label: string;
}

export interface CyclePhaseColors {
  period: string;
  follicular: string;
  fertile: string;
  luteal: string;
}

export interface ThemeColors {
  bg: BgColors;
  fg: FgColors;
  border: BorderColors;
  accent: AccentColors;
  semantic: SemanticColors;
  toggle: ToggleColors;
  cycleRing: CycleRingColors;
  cyclePhase: CyclePhaseColors;
}

export interface Theme<TId extends PremadeThemeId = PremadeThemeId> {
  id: TId;
  name: string;
  colors: ThemeColors;
  shadowColor: string;
}

export interface UserThemeSettings {
  colorSchemeMode: "system" | "light" | "dark";
  lightTheme: LightThemeId;
  darkTheme: DarkThemeId;
}

import type { PremadeThemeId } from "./theme";

// Static require() calls — cannot be dynamic (Metro limitation)
export const THEME_ICONS: Partial<Record<PremadeThemeId, number>> = {
  doe: require("../assets/images/icon-doe.png"),
  space: require("../assets/images/icon-space.png"),
  sage: require("../assets/images/icon-sage.png"),
  celestial: require("../assets/images/icon-celestial.png"),
  // chocolate: no icon asset
};

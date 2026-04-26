import type { Theme } from "@/types/theme";

const doe: Theme<"doe"> = {
  id: "doe",
  name: "Doe",
  colors: {
    bg: {
      base: "#FFF7ED",
      surface: "#FFFCF8",
      surfaceHover: "#FFF5EB",
      overlay: "rgba(255, 252, 248, 0.85)",
      muted: "rgba(232, 200, 176, 0.15)",
    },
    fg: {
      primary: "#5C3D2E",
      secondary: "#8A6B4A",
      tertiary: "#8F6B4C",
      inverse: "#FFFCF8",
      muted: "#AE8968",
    },
    border: {
      default: "#C97E45",
      subtle: "rgba(232, 200, 176, 0.3)",
      strong: "#A46230",
      accent: "rgba(201, 112, 91, 0.93)",
    },
    accent: {
      base: "#B7553B",
      muted: "rgba(201, 112, 91, 0.15)",
      text: "#FFFCF8",
    },
    semantic: {
      success: "#5A7A54",
      successFg: "#5C6B56",
      destructive: "#B7553B",
      destructiveMuted: "rgba(201, 112, 91, 0.12)",
      info: "#53749B",
      infoMuted: "rgba(139, 167, 196, 0.12)",
    },
    toggle: {
      on: "#B7553B",
      onThumb: "#FFFFFF",
      off: "rgba(232, 200, 176, 0.4)",
      offThumb: "#FFFFFF",
    },
    cycleRing: {
      outer: "#FDECD5",
      inner: "#FEF4E4",
      center: "#FFFBF5",
      label: "#5C3D2E",
    },
    cyclePhase: {
      period: "#B8543D",
      follicular: "#A1642F",
      fertile: "#587B4E",
      luteal: "#8F6B4F",
    },
  },
  shadowColor: "rgba(92, 61, 46, 0.4)",
};

export default doe;

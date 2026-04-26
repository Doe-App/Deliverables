import type { Theme } from "@/types/theme";

const celestial: Theme<"celestial"> = {
  id: "celestial",
  name: "Celestial",
  colors: {
    bg: {
      base: "#B8D4F0",
      surface: "rgba(240, 244, 250, 0.88)",
      surfaceHover: "rgba(232, 238, 246, 0.92)",
      overlay: "rgba(235, 240, 248, 0.7)",
      muted: "rgba(180, 205, 232, 0.12)",
    },
    fg: {
      primary: "#0F2847",
      secondary: "#2D5A8A",
      tertiary: "#2F5B8F",
      inverse: "#FFFFFF",
      muted: "rgba(45, 90, 138, 0.75)",
    },
    border: {
      default: "#4977AE",
      subtle: "rgba(180, 200, 224, 0.45)",
      strong: "rgba(15, 40, 71, 0.7)",
      accent: "#92649B",
    },
    accent: {
      base: "#754B7A",
      muted: "rgba(160, 120, 168, 0.12)",
      text: "#FFFFFF",
    },
    semantic: {
      success: "#256343",
      successFg: "#236442",
      destructive: "#9F3333",
      destructiveMuted: "rgba(200, 80, 80, 0.12)",
      info: "#2A5B8F",
      infoMuted: "rgba(60, 130, 200, 0.18)",
    },
    toggle: {
      on: "#754B7A",
      onThumb: "#FFFFFF",
      off: "rgba(15, 40, 71, 0.12)",
      offThumb: "rgba(255, 255, 255, 0.9)",
    },
    cycleRing: {
      outer: "#CDDEF2",
      inner: "#E6EEFA",
      center: "#F2F6FC",
      label: "#0F2847",
    },
    cyclePhase: {
      period: "#973E24",
      follicular: "#765325",
      fertile: "#2A6447",
      luteal: "#5F4F96",
    },
  },
  shadowColor: "rgba(40, 70, 120, 0.4)",
};

export default celestial;

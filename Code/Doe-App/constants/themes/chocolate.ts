import type { Theme } from "@/types/theme";

const chocolate: Theme<"chocolate"> = {
  id: "chocolate",
  name: "Chocolate",
  colors: {
    bg: {
      base: "#2E1F24",
      surface: "rgba(255, 240, 240, 0.10)",
      surfaceHover: "rgba(255, 240, 240, 0.15)",
      overlay: "rgba(46, 31, 36, 0.85)",
      muted: "rgba(200, 140, 140, 0.10)",
    },
    fg: {
      primary: "#E8D5D0",
      secondary: "#C0A098",
      tertiary: "#9E8383",
      inverse: "#2E1F24",
      muted: "rgba(192, 160, 152, 0.65)",
    },
    border: {
      default: "rgba(200, 160, 140, 0.60)",
      subtle: "rgba(200, 160, 140, 0.18)",
      strong: "rgba(200, 160, 140, 0.82)",
      accent: "rgba(200, 100, 100, 0.85)",
    },
    accent: {
      base: "#E0A0A0",
      muted: "rgba(200, 100, 100, 0.15)",
      text: "#2E1F24",
    },
    semantic: {
      success: "#7DA670",
      successFg: "#A0C890",
      destructive: "#D07060",
      destructiveMuted: "rgba(208, 112, 96, 0.15)",
      info: "#7090C0",
      infoMuted: "rgba(112, 144, 192, 0.15)",
    },
    toggle: {
      on: "#E0A0A0",
      onThumb: "#E8D5D0",
      off: "rgba(200, 160, 140, 0.22)",
      offThumb: "rgba(232, 213, 208, 0.70)",
    },
    cycleRing: {
      outer: "#4A2A2E",
      inner: "#7A4A50",
      center: "#C4908A",
      label: "#2E1F24",
    },
    cyclePhase: {
      period: "#E07878",
      follicular: "#D4A870",
      fertile: "#88CC78",
      luteal: "#C0A0A0",
    },
  },
  shadowColor: "rgba(0, 0, 0, 0.4)",
};

export default chocolate;

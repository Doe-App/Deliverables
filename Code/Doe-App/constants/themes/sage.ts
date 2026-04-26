import type { Theme } from "@/types/theme";

const sage: Theme<"sage"> = {
  id: "sage",
  name: "Sage",
  colors: {
    bg: {
      base: "#E8F0E4",
      surface: "#F2F7F0",
      surfaceHover: "#EAF2E7",
      overlay: "rgba(242, 247, 240, 0.88)",
      muted: "rgba(140, 170, 130, 0.08)",
    },
    fg: {
      primary: "#2D3B28",
      secondary: "#506848",
      tertiary: "#5D7155",
      inverse: "#F2F7F0",
      muted: "rgba(80, 104, 72, 0.72)",
    },
    border: {
      default: "#6E9163",
      subtle: "rgba(140, 170, 130, 0.12)",
      strong: "#57734E",
      accent: "#63944F",
    },
    accent: {
      base: "#4F763D",
      muted: "rgba(100, 150, 80, 0.15)",
      text: "#FFFFFF",
    },
    semantic: {
      success: "#447634",
      successFg: "#44773A",
      destructive: "#9E573B",
      destructiveMuted: "rgba(192, 112, 80, 0.12)",
      info: "#3C7289",
      infoMuted: "rgba(80, 144, 176, 0.12)",
    },
    toggle: {
      on: "#4F763D",
      onThumb: "#FFFFFF",
      off: "rgba(140, 170, 130, 0.2)",
      offThumb: "rgba(255, 255, 255, 0.8)",
    },
    cycleRing: {
      outer: "#D9E7D2",
      inner: "#F0F6EC",
      center: "#FBFDFA",
      label: "#2D3B28",
    },
    cyclePhase: {
      period: "#A2583A",
      follicular: "#836833",
      fertile: "#47773B",
      luteal: "#577351",
    },
  },
  shadowColor: "rgba(45, 59, 40, 0.4)",
};

export default sage;

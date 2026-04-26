import type { Theme } from "@/types/theme";

const space: Theme<"space"> = {
  id: "space",
  name: "Space",
  colors: {
    bg: {
      base: "#2A2145",
      surface: "rgba(255, 255, 255, 0.08)",
      surfaceHover: "rgba(255, 255, 255, 0.12)",
      overlay: "rgba(42, 33, 69, 0.8)",
      muted: "rgba(255, 255, 255, 0.04)",
    },
    fg: {
      primary: "#E8E0F0",
      secondary: "#B8A8D0",
      tertiary: "#9587AA",
      inverse: "#2A2145",
      muted: "rgba(184, 168, 208, 0.54)",
    },
    border: {
      default: "rgba(255, 255, 255, 0.34)",
      subtle: "rgba(255, 255, 255, 0.06)",
      strong: "rgba(255, 255, 255, 0.47)",
      accent: "rgba(168, 140, 220, 0.64)",
    },
    accent: {
      base: "#A88CDC",
      muted: "rgba(168, 140, 220, 0.2)",
      text: "#1A1430",
    },
    semantic: {
      success: "#64B88C",
      successFg: "#82C8A0",
      destructive: "#E07070",
      destructiveMuted: "rgba(224, 112, 112, 0.15)",
      info: "#70A0E0",
      infoMuted: "rgba(112, 160, 224, 0.15)",
    },
    toggle: {
      on: "#A88CDC",
      onThumb: "#FFFFFF",
      off: "rgba(255, 255, 255, 0.1)",
      offThumb: "rgba(255, 255, 255, 0.6)",
    },
    cycleRing: {
      outer: "#CDB8E2",
      inner: "#E4DAEF",
      center: "#F5F0FF",
      label: "#2A2145",
    },
    cyclePhase: {
      period: "#E07070",
      follicular: "#D0A070",
      fertile: "#70C090",
      luteal: "#A088C0",
    },
  },
  shadowColor: "rgba(0, 0, 0, 0.4)",
};

export default space;

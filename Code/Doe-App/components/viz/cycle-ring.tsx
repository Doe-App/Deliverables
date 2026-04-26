import { View, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme-provider";
import { ThemedText } from "@/components/themed-text";
import type { CyclePhase } from "@/types/cycle";

const PHASE_DESCRIPTORS: Record<CyclePhase, string> = {
  period: "rest and renew",
  follicular: "building momentum",
  fertile: "peak energy",
  luteal: "slow and steady",
};

type CycleRingProps = {
  size?: number;
  cycleLength?: number;
  currentDay: number;
  phaseForDay: (day: number) => CyclePhase;
  centerLabel?: string;
};

export function CycleRing({
  size = 240,
  cycleLength = 28,
  currentDay,
  phaseForDay,
  centerLabel,
}: CycleRingProps) {
  const { colors } = useTheme();

  const outerR = size / 2;
  const innerR = outerR - 26;
  const centerR = outerR - 52;
  const dotPathR = innerR;

  const dots = Array.from({ length: cycleLength }, (_, i) => {
    const day = i + 1;
    const angle = (i / cycleLength) * 2 * Math.PI - Math.PI / 2;
    const isCurrent = day === currentDay;
    const isTransition = day > 1 && phaseForDay(day) !== phaseForDay(day - 1);

    const dotR = isCurrent ? 9 : isTransition ? 7 : 5;
    const x = outerR + dotPathR * Math.cos(angle) - dotR;
    const y = outerR + dotPathR * Math.sin(angle) - dotR;
    const phase = phaseForDay(day);

    return { day, x, y, dotR, phase, isCurrent };
  });

  const currentPhase = phaseForDay(currentDay);
  const phaseLabel = centerLabel ?? currentPhase;
  const descriptor = PHASE_DESCRIPTORS[currentPhase];

  return (
    <View style={{ width: size, height: size }}>
      {/* Outer ring */}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: outerR,
            backgroundColor: colors.cycleRing.outer,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.22,
            shadowRadius: 20,
            elevation: 10,
          },
        ]}
      />

      {/* Depth separator ring */}
      <View
        style={[
          styles.circle,
          {
            width: innerR * 2 + 4,
            height: innerR * 2 + 4,
            borderRadius: innerR + 2,
            top: outerR - innerR - 2,
            left: outerR - innerR - 2,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.05)",
          },
        ]}
      />

      {/* Inner ring */}
      <View
        style={[
          styles.circle,
          {
            width: innerR * 2,
            height: innerR * 2,
            borderRadius: innerR,
            backgroundColor: colors.cycleRing.inner,
            top: outerR - innerR,
            left: outerR - innerR,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.24,
            shadowRadius: 3,
            elevation: 6,
          },
        ]}
      />

      {/* Center circle */}
      <View
        style={[
          styles.circle,
          {
            width: centerR * 2,
            height: centerR * 2,
            borderRadius: centerR,
            backgroundColor: colors.cycleRing.center,
            top: outerR - centerR,
            left: outerR - centerR,
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.24,
            elevation: 4,
          },
        ]}
      >
        <ThemedText
          type="subtitle"
          style={{
            fontSize: 36,
            lineHeight: 48,
            color: colors.cycleRing.label,
            textTransform: "capitalize",
            zIndex: 1,
          }}
        >
          {phaseLabel}
        </ThemedText>
        <ThemedText
          type="caption"
          style={{ color: colors.cycleRing.label, opacity: 0.8, fontSize: 14, zIndex: 1 }}
        >
          day {currentDay}
        </ThemedText>
        <ThemedText
          type="serif"
          style={{
            color: colors.cycleRing.label,
            opacity: 0.45,
            fontSize: 11,
            fontStyle: "italic",
            zIndex: 1,
          }}
        >
          {descriptor}
        </ThemedText>
      </View>

      {/* Phase dots */}
      {dots.map(({ day, x, y, dotR, phase, isCurrent }) => (
        <View key={day} style={[styles.dotWrapper, { left: x, top: y }]}>
          {isCurrent && (
            <View
              style={[
                styles.dotGlow,
                {
                  width: dotR * 2 + 6,
                  height: dotR * 2 + 6,
                  borderRadius: dotR + 3,
                  top: -3,
                  left: -3,
                  borderColor: "rgba(255,255,255,0.65)",
                },
              ]}
            />
          )}
          <View
            style={{
              width: dotR * 2,
              height: dotR * 2,
              borderRadius: dotR,
              backgroundColor: colors.cyclePhase[phase],
            }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
  },
  dotWrapper: {
    position: "absolute",
  },
  dotGlow: {
    position: "absolute",
    backgroundColor: "transparent",
  },
});

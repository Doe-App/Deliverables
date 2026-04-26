import { View, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme-provider";
import { ThemedText } from "@/components/themed-text";
import { spacing, radius } from "@/constants/theme";
import type { CyclePhase } from "@/types/cycle";

type PhaseEntry = {
  phase: CyclePhase;
  label: string;
  days: number;
};

type PhaseBarChartProps = {
  cycleLength?: number;
  phases?: PhaseEntry[];
};

const DEFAULT_PHASES: PhaseEntry[] = [
  { phase: "period", label: "Period", days: 5 },
  { phase: "follicular", label: "Follicular", days: 8 },
  { phase: "fertile", label: "Fertile", days: 3 },
  { phase: "luteal", label: "Luteal", days: 12 },
];

export function PhaseBarChart({ cycleLength = 28, phases = DEFAULT_PHASES }: PhaseBarChartProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {phases.map(({ phase, label, days }) => {
        const pct = days / cycleLength;
        return (
          <View key={phase} style={styles.row}>
            <ThemedText type="serif" style={[styles.label, { color: colors.fg.secondary }]}>
              {label}
            </ThemedText>
            <View style={[styles.track, { backgroundColor: colors.bg.muted }]}>
              <View
                style={[
                  styles.fill,
                  {
                    backgroundColor: colors.cyclePhase[phase],
                    width: `${Math.round(pct * 100)}%`,
                  },
                ]}
              />
            </View>
            <ThemedText type="caption" style={[styles.days, { color: colors.fg.muted }]}>
              {days}d
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  label: {
    width: 80,
    fontSize: 13,
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: radius.full,
  },
  days: {
    width: 24,
    textAlign: "right",
  },
});

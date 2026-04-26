import { View, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme-provider";
import { ThemedText } from "@/components/themed-text";
import { spacing, radius } from "@/constants/theme";
import { CYCLE_PHASES, type CyclePhase } from "@/types/cycle";

const CHART_HEIGHT = 120;

const PHASE_ORDER = CYCLE_PHASES;

type PhaseDays = Record<CyclePhase, number>;

type CycleEntry = {
  label: string;
  length: number;
  isCurrent?: boolean;
  phases?: PhaseDays;
};

type CycleLengthChartProps = {
  cycles: CycleEntry[];
  avgLength?: number;
};

export function CycleLengthChart({ cycles, avgLength }: CycleLengthChartProps) {
  const { colors } = useTheme();

  const max = Math.max(...cycles.map((c) => c.length), avgLength ?? 0);
  const avg = avgLength ?? Math.round(cycles.reduce((s, c) => s + c.length, 0) / cycles.length);
  const avgPct = avg / max;

  // Per-phase averages across all cycles that have phase data
  const phasedCycles = cycles.filter((c) => c.phases);
  const phaseAvgs: PhaseDays | null = phasedCycles.length > 0
    ? PHASE_ORDER.reduce((acc, phase) => {
      acc[phase] = Math.round(
        phasedCycles.reduce((s, c) => s + (c.phases![phase] ?? 0), 0) / phasedCycles.length
      );
      return acc;
    }, {} as PhaseDays)
    : null;

  return (
    <View style={styles.container}>
      {/* Bar area */}
      <View style={[styles.chartArea, { height: CHART_HEIGHT }]}>
        {/* Average line */}
        <View
          style={[
            styles.avgLine,
            {
              bottom: avgPct * CHART_HEIGHT,
              borderColor: colors.fg.muted,
            },
          ]}
        />

        {/* Bars */}
        <View style={styles.bars}>
          {cycles.map(({ label, length, isCurrent, phases }, i) => {
            const barH = (length / max) * CHART_HEIGHT;
            return (
              <View key={i} style={styles.barCol}>
                <ThemedText
                  type="caption"
                  style={{ color: colors.fg.secondary, fontSize: 9, marginBottom: 2 }}
                >
                  {length}
                </ThemedText>
                <View style={[styles.bar, { height: barH, opacity: isCurrent ? 1 : 0.75 }]}>
                  {phases
                    ? PHASE_ORDER.map((phase) => (
                      <View
                        key={phase}
                        style={{ flex: phases[phase], backgroundColor: colors.cyclePhase[phase] }}
                      />
                    ))
                    : (
                      <View style={{ flex: 1, backgroundColor: colors.accent.base }} />
                    )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Month labels */}
      <View style={styles.labels}>
        {cycles.map(({ label }, i) => (
          <View key={i} style={styles.labelCol}>
            <ThemedText type="caption" style={{ color: colors.fg.muted, fontSize: 10 }}>
              {label}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Per-phase averages */}
      {phaseAvgs && (
        <View style={[styles.phaseAvgRow, { marginTop: spacing.md, borderTopColor: colors.border.subtle }]}>
          {PHASE_ORDER.map((phase) => (
            <View key={phase} style={styles.phaseAvgItem}>
              <View style={[styles.phaseDot, { backgroundColor: colors.cyclePhase[phase] }]} />
              <ThemedText type="caption" style={{ color: colors.fg.secondary, fontSize: 10, textTransform: "capitalize" }}>
                {phase}
              </ThemedText>
              <ThemedText type="caption" style={{ color: colors.fg.muted, fontSize: 10 }}>
                avg {phaseAvgs[phase]}d
              </ThemedText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  chartArea: {
    position: "relative",
    justifyContent: "flex-end",
  },
  avgLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderStyle: "dashed",
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    height: "100%",
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.sm,
    overflow: "hidden",
    flexDirection: "column-reverse",
  },
  labels: {
    flexDirection: "row",
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  labelCol: {
    flex: 1,
    alignItems: "center",
  },
  avgNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  avgDash: {
    width: 16,
    height: 1,
  },
  phaseAvgRow: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: spacing.md,
    gap: spacing.xs,
  },
  phaseAvgItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  phaseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

import { View, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme-provider";
import { ThemedText } from "@/components/themed-text";
import { spacing, radius } from "@/constants/theme";
import type { CyclePhase } from "@/types/cycle";

type PhaseSegment = {
  phase: CyclePhase;
  days: number;
  label: string;
};

type CycleStripProps = {
  cycleLength?: number;
  currentDay: number;
  phases?: PhaseSegment[];
};

const DEFAULT_PHASES: PhaseSegment[] = [
  { phase: "period", days: 5, label: "Period" },
  { phase: "follicular", days: 8, label: "Follicular" },
  { phase: "fertile", days: 3, label: "Fertile" },
  { phase: "luteal", days: 12, label: "Luteal" },
];

export function CycleStrip({
  cycleLength = 28,
  currentDay,
  phases = DEFAULT_PHASES,
}: CycleStripProps) {
  const { colors } = useTheme();

  // Build day ranges for labels
  let cursor = 1;
  const ranges = phases.map(({ days }) => {
    const start = cursor;
    const end = cursor + days - 1;
    cursor = end + 1;
    return { start, end };
  });

  const markerPct = ((currentDay - 0.5) / cycleLength) * 100;

  return (
    <View style={styles.container}>
      {/* Bar + marker */}
      <View style={styles.barWrapper}>
        <View style={styles.bar}>
          {phases.map(({ phase, days }, i) => (
            <View
              key={phase}
              style={[
                styles.segment,
                {
                  flex: days,
                  backgroundColor: colors.cyclePhase[phase],
                  borderTopLeftRadius: i === 0 ? radius.full : 0,
                  borderBottomLeftRadius: i === 0 ? radius.full : 0,
                  borderTopRightRadius: i === phases.length - 1 ? radius.full : 0,
                  borderBottomRightRadius: i === phases.length - 1 ? radius.full : 0,
                },
              ]}
            />
          ))}
        </View>

        {/* Marker — thin vertical line */}
        <View
          style={[
            styles.marker,
            {
              left: `${markerPct}%` as unknown as number,
              backgroundColor: colors.fg.primary,
            },
          ]}
        />
      </View>

      {/* Phase name + day range rows */}
      <View style={styles.labels}>
        {phases.map(({ phase, days, label }, i) => (
          <View key={phase} style={{ flex: days, alignItems: "center", gap: 1 }}>
            <ThemedText type="caption" style={{ color: colors.fg.secondary, fontSize: 10 }}>
              {label}
            </ThemedText>
            <ThemedText type="caption" style={{ color: colors.fg.muted, fontSize: 9, opacity: 0.75 }}>
              {ranges[i].start}&ndash;{ranges[i].end}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  barWrapper: {
    position: "relative",
    height: 16,
    justifyContent: "center",
  },
  bar: {
    flexDirection: "row",
    height: 16,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  segment: {
    height: "100%",
  },
  marker: {
    position: "absolute",
    width: 2,
    height: 22,
    top: -3,
    borderRadius: 1,
    marginLeft: -1,
  },
  labels: {
    flexDirection: "row",
  },
});

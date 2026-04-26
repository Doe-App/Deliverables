import { View, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme-provider";
import { ThemedText } from "@/components/themed-text";
import { spacing } from "@/constants/theme";
import { CYCLE_PHASES, type CyclePhase } from "@/types/cycle";

const PHASE_LABELS: Record<CyclePhase, string> = {
  period: "Period",
  follicular: "Follicular",
  fertile: "Fertile",
  luteal: "Luteal",
};

type PhaseLegendProps = {
  variant?: "list" | "grid" | "dots" | "compact";
  phases?: CyclePhase[];
};

export function PhaseLegend({
  variant = "list",
  phases = [...CYCLE_PHASES],
}: PhaseLegendProps) {
  const { colors } = useTheme();

  const ordered = CYCLE_PHASES.filter((p) => phases.includes(p));

  if (variant === "dots") {
    return (
      <View style={styles.dotsRow}>
        {ordered.map((phase) => (
          <View
            key={phase}
            style={[
              styles.dot,
              { backgroundColor: colors.cyclePhase[phase] },
            ]}
          />
        ))}
      </View>
    );
  }

  if (variant === "compact") {
    return (
      <View style={styles.compactRow}>
        {ordered.map((phase) => (
          <View key={phase} style={styles.compactItem}>
            <View
              style={[styles.compactDot, { backgroundColor: colors.cyclePhase[phase] }]}
            />
            <ThemedText
              type="caption"
              style={{
                color: colors.fg.secondary,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontSize: 10,
              }}
            >
              {PHASE_LABELS[phase]}
            </ThemedText>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={variant === "grid" ? styles.grid : styles.list}>
      {ordered.map((phase) => (
        <View key={phase} style={styles.item}>
          <View
            style={[styles.dot, { backgroundColor: colors.cyclePhase[phase] }]}
          />
          <ThemedText type="body" style={{ color: colors.fg.primary }}>
            {PHASE_LABELS[phase]}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    columnGap: 16,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
  },
  compactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.sm,
    columnGap: spacing.lg,
  },
  compactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  compactDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

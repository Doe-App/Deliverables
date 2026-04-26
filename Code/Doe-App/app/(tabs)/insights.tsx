import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/constants/theme-provider";
import { GlassyCard } from "@/components/glassy-card";
import { PhaseBarChart } from "@/components/viz/phase-bar-chart";
import { CycleStrip } from "@/components/viz/cycle-strip";
import { CycleLengthChart } from "@/components/viz/cycle-length-chart";
import { spacing, fonts } from "@/constants/theme";

// TODO(cap2): replace with aggregated counts from symptom entries store
const SYMPTOM_SPOTLIGHT = [
  { label: "Cramps", cycles: 5, pct: 83 },
  { label: "Bloating", cycles: 4, pct: 67 },
  { label: "Fatigue", cycles: 4, pct: 67 },
  { label: "Headache", cycles: 3, pct: 50 },
];

// TODO(cap2): compute from cycle entries store (avg length, avg period, total logged)
const STATS = [
  { label: "Avg cycle", value: "28", unit: "days" },
  { label: "Avg period", value: "5", unit: "days" },
  { label: "Logged", value: "6", unit: "cycles" },
];

// TODO(cap2): derive from cycle entries store with per-phase day breakdowns
const CYCLE_HISTORY = [
  { label: "Oct", length: 29, phases: { period: 5, follicular: 9, fertile: 3, luteal: 12 } },
  { label: "Nov", length: 28, phases: { period: 6, follicular: 8, fertile: 2, luteal: 12 } },
  { label: "Dec", length: 30, phases: { period: 5, follicular: 9, fertile: 4, luteal: 12 } },
  { label: "Jan", length: 27, phases: { period: 4, follicular: 8, fertile: 3, luteal: 12 } },
  { label: "Feb", length: 28, phases: { period: 5, follicular: 8, fertile: 3, luteal: 12 } },
  { label: "Mar", length: 28, phases: { period: 5, follicular: 8, fertile: 3, luteal: 12 }, isCurrent: true },
];

function SectionLabel({ label }: { label: string }) {
  const { colors } = useTheme();
  return (
    <ThemedText
      type="label"
      style={{ color: colors.fg.secondary, textTransform: "uppercase", letterSpacing: 0.8 }}
    >
      {label}
    </ThemedText>
  );
}

export default function InsightsScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <ThemedText type="title">Insights</ThemedText>
        <ThemedText type="serif" style={{ color: colors.fg.secondary, fontSize: 16 }}>
          Six cycles of patterns, laid bare.
        </ThemedText>
      </View>

      {/* Stat chips */}
      <View style={styles.statRow}>
        {STATS.map(({ label, value, unit }) => (
          <GlassyCard key={label} style={styles.statCard} padding={16}>
            <ThemedText
              type="serif"
              style={{ fontFamily: fonts.display, fontSize: 36, lineHeight: 40, color: colors.accent.base }}
            >
              {value}
            </ThemedText>
            <ThemedText type="caption" style={{ color: colors.fg.secondary }}>
              {unit}
            </ThemedText>
            <ThemedText type="caption" style={{ color: colors.fg.muted, marginTop: 2 }}>
              {label}
            </ThemedText>
          </GlassyCard>
        ))}
      </View>

      {/* Cycle overview strip */}
      <View style={styles.section}>
        <SectionLabel label="Cycle overview" />
        <GlassyCard padding={20}>
          <CycleStrip cycleLength={28} currentDay={14} />
        </GlassyCard>
      </View>

      {/* Phase breakdown */}
      <View style={styles.section}>
        <SectionLabel label="Phase breakdown" />
        <GlassyCard padding={20}>
          <PhaseBarChart cycleLength={28} />
        </GlassyCard>
      </View>

      {/* Cycle history chart */}
      <View style={styles.section}>
        <SectionLabel label="Cycle history" />
        <GlassyCard padding={20}>
          <CycleLengthChart cycles={CYCLE_HISTORY} avgLength={28} />
        </GlassyCard>
      </View>

      {/* Symptom spotlight */}
      <View style={styles.section}>
        <SectionLabel label="Symptom spotlight" />
        <GlassyCard padding={20} style={{ gap: spacing.md }}>
          <ThemedText type="serif" style={{ color: colors.fg.secondary, fontSize: 13, fontStyle: "italic" }}>
            Most logged across your last 6 cycles
          </ThemedText>
          {SYMPTOM_SPOTLIGHT.map(({ label, cycles, pct }) => (
            <View key={label} style={{ gap: spacing.xs }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 14 }}>
                  {label}
                </ThemedText>
                <ThemedText type="caption" style={{ color: colors.fg.muted }}>
                  {cycles} of 6 cycles
                </ThemedText>
              </View>
              <View style={[styles.bar, { backgroundColor: colors.bg.muted }]}>
                <View
                  style={[styles.barFill, { backgroundColor: colors.accent.muted, width: `${pct}%` }]}
                />
              </View>
            </View>
          ))}
        </GlassyCard>
      </View>

      {/* Regularity */}
      <View style={styles.section}>
        <SectionLabel label="Regularity" />
        <GlassyCard padding={20} style={{ gap: spacing.sm }}>
          {/* TODO(cap2): compute regularity from cycle length variance */}
          <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 18 }}>
            Regular
          </ThemedText>
          <ThemedText type="serif" style={{ color: colors.fg.secondary, fontSize: 14 }}>
            Your cycles vary by less than 2 days. Very consistent.
          </ThemedText>
          <View style={[styles.bar, { backgroundColor: colors.bg.muted, marginTop: spacing.xs }]}>
            <View
              style={[styles.barFill, { backgroundColor: colors.semantic.success, width: "85%" }]}
            />
          </View>
        </GlassyCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing["2xl"],
    paddingTop: 64,
    paddingBottom: 110,
    gap: spacing["2xl"],
  },
  header: {
    gap: spacing.sm,
  },
  section: {
    gap: spacing.md,
  },
  statRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    gap: 2,
  },
  bar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
});

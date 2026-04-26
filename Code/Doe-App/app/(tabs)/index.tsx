import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/constants/theme-provider";
import { CycleRing } from "@/components/viz/cycle-ring";
import { PhaseLegend } from "@/components/viz/phase-legend";
import { GlassyCard } from "@/components/glassy-card";
import { spacing } from "@/constants/theme";
import { type CyclePhase, phaseForDay } from "@/types/cycle";

// TODO(cap2): replace with derived state from cycle entries store
const CYCLE_LENGTH = 28;
const CURRENT_DAY = 14;

const PHASE_TIPS: Record<CyclePhase, string> = {
  period: "Be gentle with yourself today.",
  follicular: "A good time to channel focus and momentum.",
  fertile: "Energy tends to peak around now, it's a great time for exercise. Go out there and seize the day!",
  luteal: "Take it easy. Rest and restore this week.",
};

export default function HomeScreen() {
  const { colors } = useTheme();
  const currentPhase = phaseForDay(CURRENT_DAY);
  const daysUntilNext = CYCLE_LENGTH - CURRENT_DAY + 1;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <ThemedText type="title">Hey Doe!</ThemedText>
        <ThemedText type="serif" style={{ color: colors.fg.secondary, fontSize: 16 }}>
          You are currently on Day {CURRENT_DAY} of your cycle
        </ThemedText>
      </View>

      <View style={styles.ringSection}>
        <CycleRing
          size={320}
          cycleLength={CYCLE_LENGTH}
          currentDay={CURRENT_DAY}
          phaseForDay={phaseForDay}
        />
        <PhaseLegend variant="compact" />
      </View>

      <GlassyCard style={styles.card} padding={20}>
        <ThemedText type="label" style={{ color: colors.fg.primary }}>
          Next period
        </ThemedText>
        <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 20, lineHeight: 26, marginTop: 4 }}>
          Estimated in · {daysUntilNext} days
        </ThemedText>
        <ThemedText
          type="serif"
          style={{ color: colors.fg.muted, fontSize: 14, fontStyle: "italic", marginTop: spacing.sm }}
        >
          {PHASE_TIPS[currentPhase]}
        </ThemedText>
      </GlassyCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing["3xl"],
    paddingTop: 64,
    gap: spacing["3xl"],
  },
  header: {
    gap: spacing.sm,
  },
  ringSection: {
    alignItems: "center",
    gap: spacing["3xl"],
  },
  card: {
    gap: 0,
  },
});

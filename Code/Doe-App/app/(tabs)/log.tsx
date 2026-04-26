import { ScrollView, StyleSheet, View, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/constants/theme-provider";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { GlassyCard } from "@/components/glassy-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { spacing, radius, borderWidth, fonts } from "@/constants/theme";
import type { FlowLevel } from "@/db/schema";

const FLOW_LEVELS: { value: FlowLevel; label: string; symbol: string }[] = [
  { value: "SPOTTING", label: "Spotting", symbol: "·" },
  { value: "LIGHT", label: "Light", symbol: "○" },
  { value: "MEDIUM", label: "Medium", symbol: "◑" },
  { value: "HEAVY", label: "Heavy", symbol: "●" },
];

const SYMPTOMS = [
  "Cramps", "Bloating", "Headache", "Fatigue",
  "Mood swings", "Tender breasts", "Acne", "Cravings",
  "Nausea", "Back pain", "Insomnia", "Anxious",
];

type MoodOption = {
  key: string;
  label: string;
  icon: "moon.stars" | "sun.max" | "cloud.drizzle" | "zzz" | "bolt" | "wind";
};

const MOODS: MoodOption[] = [
  { key: "calm", label: "Calm", icon: "moon.stars" },
  { key: "happy", label: "Happy", icon: "sun.max" },
  { key: "moody", label: "Moody", icon: "cloud.drizzle" },
  { key: "tired", label: "Tired", icon: "zzz" },
  { key: "energetic", label: "Energetic", icon: "bolt" },
  { key: "anxious", label: "Anxious", icon: "wind" },
];

const ENERGY_LEVELS = [
  { value: 1, label: "Drained" },
  { value: 2, label: "Low" },
  { value: 3, label: "Okay" },
  { value: 4, label: "Good" },
  { value: 5, label: "Great" },
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

export default function LogScreen() {
  const { colors } = useTheme();
  const [periodOn, setPeriodOn] = useState(false);
  const [flow, setFlow] = useState<FlowLevel | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [mood, setMood] = useState<string | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(s)) { next.delete(s) } else { next.add(s) }
      return next;
    });
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <ThemedText type="title">Log</ThemedText>
        <ThemedText type="serif" style={{ color: colors.fg.secondary, fontSize: 16 }}>{today}</ThemedText>
        <ThemedText type="serif" style={{ color: colors.fg.muted, fontSize: 14, fontStyle: "italic" }}>
          A few moments to check in with yourself.
        </ThemedText>
      </View>

      {/* Period toggle */}
      <GlassyCard padding={20}>
        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 16, fontFamily: fonts.sansBold }}>
              Period today
            </ThemedText>
            <ThemedText type="serif" style={{ color: colors.fg.secondary, fontSize: 13 }}>
              {periodOn ? "Logged for today" : "Not logged yet"}
            </ThemedText>
          </View>
          <Toggle value={periodOn} onValueChange={setPeriodOn} />
        </View>
      </GlassyCard>

      {/* Flow picker — always visible, dimmed when period is off */}
      <View style={[styles.section, { opacity: periodOn ? 1 : 0.4 }]} pointerEvents={periodOn ? "auto" : "none"}>
        <SectionLabel label="Flow" />
        <View style={styles.flowRow}>
          {FLOW_LEVELS.map(({ value, label, symbol }) => {
            const active = flow === value;
            return (
              <Pressable key={value} onPress={() => setFlow(active ? null : value)} style={{ flex: 1 }}>
                {({ pressed }) => (
                  <GlassyCard
                    padding={12}
                    style={[
                      styles.flowChip,
                      active && { backgroundColor: colors.accent.base, borderColor: colors.accent.base },
                      { opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    <ThemedText type="body" style={{ color: active ? colors.accent.text : colors.fg.muted, fontSize: 18 }}>
                      {symbol}
                    </ThemedText>
                    <ThemedText type="caption" style={{ color: active ? colors.accent.text : colors.fg.secondary }}>
                      {label}
                    </ThemedText>
                  </GlassyCard>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Symptoms */}
      <View style={styles.section}>
        <SectionLabel label="Symptoms" />
        <View style={styles.chipWrap}>
          {SYMPTOMS.map((s) => {
            const active = selectedSymptoms.has(s);
            return (
              <Pressable key={s} onPress={() => toggleSymptom(s)}>
                {({ pressed }) => (
                  <View
                    style={[
                      styles.chip,
                      {
                        backgroundColor: active ? colors.accent.muted : colors.bg.surface,
                        borderColor: active ? colors.accent.base : colors.border.subtle,
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                  >
                    <ThemedText type="caption" style={{ color: active ? colors.accent.base : colors.fg.secondary }}>
                      {s}
                    </ThemedText>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Mood */}
      <View style={styles.section}>
        <SectionLabel label="Mood" />
        <ThemedText type="serif" style={{ color: colors.fg.muted, fontSize: 13, fontStyle: "italic" }}>
          How are you feeling right now?
        </ThemedText>
        <View style={styles.moodGrid}>
          {[MOODS.slice(0, 3), MOODS.slice(3)].map((row, ri) => (
            <View key={ri} style={styles.moodRow}>
              {row.map(({ key, label, icon }) => {
                const active = mood === key;
                return (
                  <Pressable key={key} onPress={() => setMood(active ? null : key)} style={{ flex: 1 }}>
                    {({ pressed }) => (
                      <View
                        style={[
                          styles.moodChip,
                          {
                            backgroundColor: active ? colors.accent.muted : colors.bg.surface,
                            borderColor: active ? colors.accent.base : colors.border.subtle,
                            borderWidth: borderWidth.default,
                            opacity: pressed ? 0.7 : 1,
                          },
                        ]}
                      >
                        <IconSymbol
                          name={icon}
                          size={20}
                          color={active ? colors.accent.base : colors.fg.secondary}
                        />
                        <ThemedText type="caption" style={{ color: active ? colors.accent.base : colors.fg.muted, fontSize: 10 }}>
                          {label}
                        </ThemedText>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Energy */}
      <View style={styles.section}>
        <SectionLabel label="Energy" />
        <View style={styles.energyRow}>
          {ENERGY_LEVELS.map(({ value, label }) => {
            const active = energy === value;
            return (
              <Pressable key={value} onPress={() => setEnergy(active ? null : value)} style={{ flex: 1 }}>
                {({ pressed }) => (
                  <View
                    style={[
                      styles.energyChip,
                      {
                        backgroundColor: active ? colors.accent.base : colors.bg.surface,
                        borderColor: active ? colors.accent.base : colors.border.subtle,
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                  >
                    <ThemedText
                      type="caption"
                      style={{ color: active ? colors.accent.text : colors.fg.secondary, fontSize: 11 }}
                    >
                      {label}
                    </ThemedText>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Notes */}
      <View style={styles.section}>
        <SectionLabel label="Notes" />
        <GlassyCard padding={16}>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            placeholder="Anything worth remembering today..."
            placeholderTextColor={colors.fg.muted}
            style={[styles.notesInput, { color: colors.fg.primary }]}
          />
        </GlassyCard>
      </View>

      <Button
        title={saved ? "Logged for today" : "Save"}
        onPress={() => {
          if (saved) return;
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
        variant={saved ? "default" : "primary"}
        disabled={saved}
        size="lg"
      />
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
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  flowRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  flowChip: {
    alignItems: "center",
    gap: spacing.xs,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    borderRadius: radius.full,
    borderWidth: borderWidth.default,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  moodGrid: {
    gap: spacing.sm,
  },
  moodRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  moodChip: {
    alignItems: "center",
    gap: 4,
    padding: 10,
    borderRadius: radius.md,
  },
  energyRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  energyChip: {
    borderRadius: radius.full,
    borderWidth: borderWidth.default,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  notesInput: {
    fontFamily: fonts.serif,
    fontSize: 14,
    lineHeight: 22,
    minHeight: 72,
    textAlignVertical: "top",
  },
});

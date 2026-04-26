import { ScrollView, StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/constants/theme-provider";
import { Button } from "@/components/ui/button";
import { GlassyCard } from "@/components/glassy-card";
import { spacing, radius, borderWidth, fonts, withAlpha } from "@/constants/theme";
import type { CyclePhase } from "@/types/cycle";

type Permission = "Phase" | "Dates" | "Symptoms" | "Mood";
type Status = "active" | "pending";

type OutgoingContact = {
  name: string;
  role: string;
  permissions: Permission[];
  status: Status;
  lastSynced: string;
};

type IncomingContact = {
  name: string;
  role: string;
  currentPhase: CyclePhase;
  cycleDay: number;
  sharing: Permission[];
  symptoms?: string[];
  mood?: string;
  lastSynced: string;
};

// TODO(cap2): wire social service — fetch outgoing shares from sharing table
const SHARING_WITH: OutgoingContact[] = [
  {
    name: "Alex Rivera",
    role: "Partner",
    permissions: ["Phase", "Dates", "Mood"],
    status: "active",
    lastSynced: "Just now",
  },
  {
    name: "Sam Chen",
    role: "Close friend",
    permissions: ["Phase"],
    status: "active",
    lastSynced: "2 hours ago",
  },
  {
    name: "Dr. Patel",
    role: "Healthcare provider",
    permissions: ["Phase", "Dates", "Symptoms"],
    status: "pending",
    lastSynced: "Invite sent",
  },
];

// TODO(cap2): wire social service — fetch incoming shares from sharing table
const SHARED_WITH_YOU: IncomingContact[] = [
  {
    name: "Alex Rivera",
    role: "Partner",
    currentPhase: "luteal",
    cycleDay: 22,
    sharing: ["Phase", "Mood", "Symptoms"],
    symptoms: ["Cramps", "Fatigue"],
    mood: "Tired",
    lastSynced: "Just now",
  },
  {
    name: "Morgan Lee",
    role: "Close friend",
    currentPhase: "follicular",
    cycleDay: 8,
    sharing: ["Phase"],
    lastSynced: "3 hours ago",
  },
];

const PHASE_LABELS: Record<CyclePhase, string> = {
  period: "Period",
  follicular: "Follicular",
  fertile: "Fertile",
  luteal: "Luteal",
};

function phaseCopy(phase: CyclePhase, firstName: string, symptoms?: string[]): string {
  const symptomNote = symptoms?.length
    ? ` She's logged ${symptoms.map((s) => s.toLowerCase()).join(" and ")}.`
    : "";
  switch (phase) {
    case "period":
      return `${firstName} is on her period — rest and warmth go a long way right now.${symptomNote}`;
    case "follicular":
      return `Energy is coming back in the follicular phase. A good time to make plans with ${firstName}.${symptomNote}`;
    case "fertile":
      return `${firstName} is at her peak — sharp, social, and full of energy right now.${symptomNote}`;
    case "luteal":
      return `The luteal phase can bring tension and fatigue. Worth checking in with ${firstName}.${symptomNote}`;
  }
}

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

function IncomingCard({ name, role, currentPhase, cycleDay, sharing, symptoms, mood, lastSynced }: IncomingContact) {
  const { colors } = useTheme();
  const initial = name.charAt(0).toUpperCase();
  const phaseColor = colors.cyclePhase[currentPhase];
  const firstName = name.split(" ")[0];
  const phaseOnly = sharing.length === 1 && sharing[0] === "Phase";

  return (
    <Pressable>
      {({ pressed }) => (
        <GlassyCard padding={spacing.lg} style={{ opacity: pressed ? 0.8 : 1, gap: spacing.md }}>
          {/* Phase badge — absolute top-right */}
          <View style={[styles.phasePill, styles.badgeTopRight, { backgroundColor: withAlpha(phaseColor, 0.13), borderColor: withAlpha(phaseColor, 0.40) }]}>
            <View style={[styles.phaseDot, { backgroundColor: phaseColor }]} />
            <ThemedText style={{ color: phaseColor, fontSize: 10, fontFamily: fonts.sans }}>
              Day {cycleDay} · {PHASE_LABELS[currentPhase]}
            </ThemedText>
          </View>

          {/* Header: avatar + name/role */}
          <View style={styles.contactHeader}>
            <View style={[styles.avatar, { backgroundColor: withAlpha(phaseColor, 0.20), borderColor: phaseColor }]}>
              <ThemedText style={{ color: phaseColor, fontSize: 15, fontFamily: fonts.sansBold, lineHeight: 20 }}>
                {initial}
              </ThemedText>
            </View>
            <View style={{ gap: 2 }}>
              <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 15 }}>
                {name}
              </ThemedText>
              <ThemedText type="caption" style={{ color: colors.fg.muted }}>
                {role} · {lastSynced}
              </ThemedText>
            </View>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />

          {/* Phase / symptom body copy */}
          <ThemedText
            type="serif"
            style={{ color: colors.fg.secondary, fontSize: 13, fontStyle: "italic", lineHeight: 20 }}
          >
            {phaseOnly
              ? `${firstName} is sharing her phase only — ${PHASE_LABELS[currentPhase].toLowerCase()} phase, day ${cycleDay}.`
              : phaseCopy(currentPhase, firstName, symptoms)}
          </ThemedText>

          {/* Symptom + mood chips (if shared) */}
          {!phaseOnly && (mood || symptoms?.length) && (
            <View style={styles.chipRow}>
              {mood && (
                <ThemedView surface="surface" style={[styles.chip, { borderColor: colors.border.subtle }]}>
                  <ThemedText type="caption" style={{ color: colors.fg.secondary, fontSize: 10 }}>
                    {mood}
                  </ThemedText>
                </ThemedView>
              )}
              {symptoms?.map((s) => (
                <ThemedView key={s} surface="surface" style={[styles.chip, { borderColor: colors.border.subtle }]}>
                  <ThemedText type="caption" style={{ color: colors.fg.secondary, fontSize: 10 }}>
                    {s}
                  </ThemedText>
                </ThemedView>
              ))}
            </View>
          )}
        </GlassyCard>
      )}
    </Pressable>
  );
}

function OutgoingCard({ name, role, permissions, status, lastSynced }: OutgoingContact) {
  const { colors } = useTheme();
  const initial = name.charAt(0).toUpperCase();

  return (
    <Pressable>
      {({ pressed }) => (
        <GlassyCard padding={spacing.lg} style={{ opacity: pressed ? 0.8 : 1, gap: spacing.md }}>
          {/* Status badge — absolute top-right */}
          <View
            style={[
              styles.statusChip,
              styles.badgeTopRight,
              {
                backgroundColor: status === "active"
                  ? withAlpha(colors.semantic.success, 0.13)
                  : withAlpha(colors.semantic.info, 0.13),
              },
            ]}
          >
            <ThemedText
              type="caption"
              style={{
                color: status === "active" ? colors.semantic.success : colors.semantic.info,
                fontSize: 10,
              }}
            >
              {status === "active" ? "Active" : "Pending"}
            </ThemedText>
          </View>

          {/* Header: avatar + name/role */}
          <View style={styles.contactHeader}>
            <View style={[styles.avatar, { backgroundColor: withAlpha(colors.accent.base, 0.09), borderColor: withAlpha(colors.accent.base, 0.33) }]}>
              <ThemedText style={{ color: colors.accent.base, fontSize: 15, fontFamily: fonts.sansBold, lineHeight: 20 }}>
                {initial}
              </ThemedText>
            </View>
            <View style={{ gap: 2 }}>
              <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 15 }}>
                {name}
              </ThemedText>
              <ThemedText type="caption" style={{ color: colors.fg.muted }}>
                {role} · {lastSynced}
              </ThemedText>
            </View>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />

          {/* Can see — bold label + chips inline */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flexWrap: "wrap" }}>
            <ThemedText style={{ color: colors.fg.primary, fontSize: 12, fontFamily: fonts.sansBold }}>
              Can see
            </ThemedText>
            {permissions.map((p) => (
              <View
                key={p}
                style={[styles.chip, { backgroundColor: colors.accent.muted, borderColor: colors.accent.base }]}
              >
                <ThemedText type="label" style={{ color: colors.accent.base, fontSize: 10 }}>
                  {p}
                </ThemedText>
              </View>
            ))}
          </View>
        </GlassyCard>
      )}
    </Pressable>
  );
}

export default function SocialScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <ThemedText type="title">Your people</ThemedText>
        <ThemedText type="serif" style={{ color: colors.fg.secondary, fontSize: 16 }}>
          The people who have your back.
        </ThemedText>
        <ThemedText type="serif" style={{ color: colors.fg.muted, fontSize: 14, fontStyle: "italic" }}>
          You choose what they see. Always.
        </ThemedText>
      </View>

      <View style={styles.section}>
        <SectionLabel label="Shared with you" />
        <View style={styles.list}>
          {SHARED_WITH_YOU.map((c) => (
            <IncomingCard key={c.name} {...c} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionLabel label="Sharing with" />
        <View style={styles.list}>
          {SHARING_WITH.map((c) => (
            <OutgoingCard key={c.name} {...c} />
          ))}
        </View>
      </View>

      <GlassyCard padding={20} style={{ gap: spacing.sm }}>
        <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 16 }}>
          Built on trust
        </ThemedText>
        <ThemedText type="serif" style={{ color: colors.fg.secondary, fontSize: 14 }}>
          Connected people only ever see what you explicitly share — your phase, your mood, your dates, or your symptoms. Notes and raw logs are never shared. You can revoke access at any time, instantly.
        </ThemedText>
      </GlassyCard>

      {/* TODO(cap2): navigate to invite flow */}
      <Button title="Add someone new" onPress={() => { }} size="lg" />
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
  list: {
    gap: spacing.sm,
  },
  badgeTopRight: {
    position: "absolute",
    top: spacing.lg,
    right: spacing.lg,
  },
  contactHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  divider: {
    height: 0.5,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  statusChip: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  chip: {
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  phasePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  phaseDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
});

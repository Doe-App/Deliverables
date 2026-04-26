import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/constants/theme-provider";
import { spacing, radius } from "@/constants/theme";

const FEATURES = [
  {
    icon: "book.fill" as const,
    title: "Log your cycle",
    body: "Track flow, symptoms, mood, and energy — in under a minute.",
  },
  {
    icon: "chart.bar.fill" as const,
    title: "Understand your patterns",
    body: "See what your body does across every phase, month after month.",
  },
  {
    icon: "person.2.fill" as const,
    title: "Share with care",
    body: "Let the people who matter see what you choose. Nothing more.",
  },
];

export default function IntroScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      {/* Brand */}
      <View style={styles.brand}>
        <ThemedText
          type="title"
          style={{
            fontSize: 64,
            lineHeight: 68,
            letterSpacing: -1,
            color: colors.accent.base,
          }}
        >
          Doe
        </ThemedText>
        <ThemedText
          type="serif"
          style={{
            color: colors.fg.secondary,
            fontSize: 18,
            fontStyle: "italic",
            marginTop: spacing.sm,
          }}
        >
          Your cycle, clearly.
        </ThemedText>
      </View>

      {/* Feature rows */}
      <View style={styles.features}>
        {FEATURES.map(({ icon, title, body }) => (
          <View key={title} style={styles.featureRow}>
            <View style={[styles.featureIcon, { backgroundColor: colors.accent.muted }]}>
              <IconSymbol name={icon} size={20} color={colors.accent.base} />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <ThemedText
                type="serif"
                style={{ color: colors.fg.primary, fontSize: 15 }}
              >
                {title}
              </ThemedText>
              <ThemedText
                type="caption"
                style={{ color: colors.fg.muted, lineHeight: 18 }}
              >
                {body}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      {/* Footer note */}
      <ThemedText
        type="caption"
        style={{ color: colors.fg.muted, textAlign: "center", fontStyle: "italic" }}
      >
        No account required. Your data stays on your device.
      </ThemedText>

      {/* CTA */}
      <View style={styles.buttonContainer}>
        <Button
          title="Get started"
          onPress={() => router.replace("/(tabs)")}
          variant="primary"
          size="lg"
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing["2xl"],
    paddingTop: 100,
    paddingBottom: spacing["3xl"],
    gap: spacing["3xl"],
  },
  brand: {
    alignItems: "center",
  },
  features: {
    gap: spacing.lg,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});
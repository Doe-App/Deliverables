import { ScrollView, StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/constants/theme-provider";
import { GlassyCard } from "@/components/glassy-card";
import {
  PREMADE_THEMES,
  LIGHT_THEME_IDS,
  DARK_THEME_IDS,
  spacing,
  radius,
  borderWidth,
  fonts,
} from "@/constants/theme";
import { useThemeSettings } from "@/store/use-theme-settings";
import type { PremadeThemeId } from "@/constants/theme";


type ColorSchemeMode = "system" | "light" | "dark";

function ThemeCard({
  themeId,
  isActive,
  onPress,
}: {
  themeId: PremadeThemeId;
  isActive: boolean;
  onPress: () => void;
}) {
  const theme = PREMADE_THEMES[themeId];
  const { colors } = theme;

  const swatches = [
    colors.bg.base,
    colors.fg.primary,
    colors.accent.base,
    colors.semantic.success,
    colors.semantic.info,
    colors.cyclePhase.period,
    colors.cyclePhase.follicular,
    colors.cyclePhase.fertile,
    colors.cyclePhase.luteal,
  ];

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.bg.base,
              borderColor: isActive ? colors.accent.base : colors.border.subtle,
              borderWidth: isActive ? borderWidth.thick : borderWidth.default,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <ThemedText
              type="body"
              style={[styles.cardName, { color: colors.fg.primary, fontFamily: fonts.display, fontSize: 16 }]}
            >
              {theme.name}
            </ThemedText>
            {isActive && (
              <View
                style={[
                  styles.activeChip,
                  { backgroundColor: colors.accent.base },
                ]}
              >
                <ThemedText
                  type="label"
                  style={{ color: colors.accent.text, fontSize: 10 }}
                >
                  ✓
                </ThemedText>
              </View>
            )}
          </View>

          <View style={styles.previewWrapper}>
            <View
              style={[
                styles.previewBg,
                {
                  backgroundColor: colors.bg.surface,
                  borderColor: colors.border.subtle,
                },
              ]}
            >
              <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 13 }}>
                Days, tracked.
              </ThemedText>
              <ThemedText
                type="serif"
                style={{ color: colors.fg.secondary, fontSize: 11 }}
              >
                A seamless palette.
              </ThemedText>
              <View
                style={[
                  styles.previewButton,
                  { backgroundColor: colors.accent.base },
                ]}
              >
                <ThemedText
                  type="label"
                  style={{ color: colors.accent.text }}
                >
                  Today
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.swatchRow}>
            {swatches.map((color, i) => (
              <View
                key={i}
                style={[
                  styles.swatch,
                  {
                    backgroundColor: color,
                    borderColor: colors.border.subtle,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}
    </Pressable>
  );
}

const SCHEME_MODES: { key: ColorSchemeMode; label: string }[] = [
  { key: "system", label: "System" },
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
];

export default function ThemeSettingsScreen() {
  const { colors } = useTheme();
  const { settings, setLightTheme, setDarkTheme, setColorSchemeMode } =
    useThemeSettings();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <ThemedText type="subtitle">Themes</ThemedText>
        <ThemedText type="body" style={{ opacity: 0.7 }}>
          Five premade palettes, built for every mood.
        </ThemedText>
      </View>

      {/* Color scheme mode toggle */}
      <View style={styles.section}>
        <ThemedText type="label" style={[styles.sectionLabel, { color: colors.fg.secondary }]}>
          Color Scheme
        </ThemedText>
        <GlassyCard style={styles.modeToggle} padding={spacing.xs}>
          {SCHEME_MODES.map(({ key, label }) => {
            const active = settings.colorSchemeMode === key;
            return (
              <Pressable
                key={key}
                onPress={() => setColorSchemeMode(key)}
                style={[
                  styles.modeBtn,
                  active && { backgroundColor: colors.accent.base },
                ]}
              >
                <ThemedText
                  type="label"
                  style={{
                    color: active ? colors.accent.text : colors.fg.secondary,
                  }}
                >
                  {label}
                </ThemedText>
              </Pressable>
            );
          })}
        </GlassyCard>
      </View>

      {/* Light themes */}
      <View style={styles.section}>
        <ThemedText type="label" style={[styles.sectionLabel, { color: colors.fg.secondary }]}>
          Light Theme
        </ThemedText>
        <View style={styles.cardGrid}>
          {LIGHT_THEME_IDS.map((id) => (
            <ThemeCard
              key={id}
              themeId={id}
              isActive={settings.lightTheme === id}
              onPress={() => setLightTheme(id)}
            />
          ))}
        </View>
      </View>

      {/* Dark themes */}
      <View style={styles.section}>
        <ThemedText type="label" style={[styles.sectionLabel, { color: colors.fg.secondary }]}>
          Dark Theme
        </ThemedText>
        <View style={styles.cardGrid}>
          {DARK_THEME_IDS.map((id) => (
            <ThemeCard
              key={id}
              themeId={id}
              isActive={settings.darkTheme === id}
              onPress={() => setDarkTheme(id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing["2xl"],
    gap: spacing["2xl"],
    paddingTop: 64,
    paddingBottom: 110,
  },
  header: {
    gap: spacing.sm,
  },
  section: {
    gap: spacing.md,
  },
  sectionLabel: {
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  modeToggle: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  modeBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  cardGrid: {
    gap: spacing.md,
  },
  card: {
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
  },
  cardName: {
    flex: 1,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  activeChip: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  previewWrapper: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  previewBg: {
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    padding: spacing.md,
    gap: spacing.xs,
  },
  previewButton: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    marginTop: spacing.xs,
  },
  swatchRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xl,
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  swatch: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: borderWidth.thin,
  },
});

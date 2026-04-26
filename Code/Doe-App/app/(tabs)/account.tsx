import { ScrollView, StyleSheet, View, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/constants/theme-provider";
import { Toggle } from "@/components/ui/toggle";
import { GlassyCard } from "@/components/glassy-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAccount } from "@/store/use-account";
import { spacing, radius, fonts } from "@/constants/theme";

const STATS = [
  { label: "cycle", value: "Day 14" },
  { label: "logged", value: "6 cycles" },
  { label: "avg length", value: "28 days" },
];

function SettingsRow({
  label,
  sublabel,
  icon,
  right,
  onPress,
}: {
  label: string;
  sublabel?: string;
  icon?: React.ComponentProps<typeof IconSymbol>["name"];
  right?: React.ReactNode;
  onPress?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      {({ pressed }) => (
        <View style={[styles.settingsRow, { opacity: pressed ? 0.7 : 1 }]}>
          {icon && (
            <View style={[styles.iconBadge, { backgroundColor: colors.accent.muted }]}>
              <IconSymbol name={icon} size={20} color={colors.accent.base} />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <ThemedText type="serif" style={{ color: colors.fg.primary, fontSize: 15 }}>
              {label}
            </ThemedText>
            {sublabel && (
              <ThemedText type="caption" style={{ color: colors.fg.muted }}>
                {sublabel}
              </ThemedText>
            )}
          </View>
          <View style={{ alignSelf: "center" }}>
            {right ?? (
              onPress && <IconSymbol name="chevron.right" size={18} color={colors.fg.muted} />
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
}

function Divider() {
  const { colors } = useTheme();
  return <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />;
}

export default function AccountScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { profile, setDisplayName, setCloudSync } = useAccount();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.displayName ?? "");
  const [notificationsOn, setNotificationsOn] = useState(false);

  const initial = profile.displayName?.charAt(0).toUpperCase() ?? "?";

  const commitName = () => {
    setEditingName(false);
    const trimmed = nameInput.trim() || null;
    setDisplayName(trimmed);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      contentContainerStyle={styles.container}
    >
      {/* Profile header */}
      <GlassyCard padding={24} style={styles.profileCard}>
        <View style={[styles.avatar, { backgroundColor: colors.accent.muted, borderColor: colors.accent.base }]}>
          <ThemedText
            type="title"
            style={{ color: colors.accent.base, fontSize: 28 }}
          >
            {initial}
          </ThemedText>
        </View>
        {editingName ? (
          <TextInput
            value={nameInput}
            onChangeText={setNameInput}
            onBlur={commitName}
            onSubmitEditing={commitName}
            autoFocus
            placeholder="Your name"
            placeholderTextColor={colors.fg.muted}
            style={[styles.nameInput, { color: colors.fg.primary, borderColor: colors.accent.base }]}
          />
        ) : (
          <Pressable onPress={() => { setNameInput(profile.displayName ?? ""); setEditingName(true); }}>
            <ThemedText
              type="serif"
              style={{ color: colors.fg.primary, fontSize: 22, paddingTop: 4, textAlign: "center" }}
            >
              {profile.displayName ?? "Add your name"}
            </ThemedText>
            <ThemedText type="caption" style={{ color: colors.fg.muted, textAlign: "center", marginTop: 2 }}>
              Tap to edit
            </ThemedText>
          </Pressable>
        )}
      </GlassyCard>

      {/* Quick nav rows */}
      <GlassyCard padding={0} style={{ overflow: "hidden" }}>
        <View style={{ padding: spacing.md }}>
          <SettingsRow
            label="People syncing with you"
            sublabel="3 connected"
            icon="person.2.fill"
            onPress={() => router.push("/(tabs)/social")}
          />
        </View>
        <Divider />
        <View style={{ padding: spacing.md }}>
          <SettingsRow
            label="Themes"
            sublabel="Five palettes, built for every mood"
            icon="paintbrush.fill"
            onPress={() => router.push("/(tabs)/theme-settings")}
          />
        </View>
      </GlassyCard>

      {/* Settings */}
      <View style={styles.section}>
        <ThemedText
          type="label"
          style={{ color: colors.fg.secondary, textTransform: "uppercase", letterSpacing: 0.8 }}
        >
          Settings
        </ThemedText>
        <GlassyCard padding={0} style={{ overflow: "hidden" }}>
          <View style={{ padding: spacing.md }}>
            <SettingsRow
              label="Notifications"
              sublabel="Period reminders and insights"
              icon="bell.fill"
              right={<Toggle value={notificationsOn} onValueChange={setNotificationsOn} />}
            />
          </View>
          <Divider />
          <View style={{ padding: spacing.md }}>
            <SettingsRow
              label="Cloud sync"
              sublabel="Back up your data securely"
              icon="icloud.fill"
              right={<Toggle value={profile.cloudSyncEnabled} onValueChange={setCloudSync} />}
            />
          </View>
        </GlassyCard>
      </View>

      {/* Data */}
      <View style={styles.section}>
        <ThemedText
          type="label"
          style={{ color: colors.fg.secondary, textTransform: "uppercase", letterSpacing: 0.8 }}
        >
          Data
        </ThemedText>
        <GlassyCard padding={0} style={{ overflow: "hidden" }}>
          <View style={{ padding: spacing.md }}>
            <SettingsRow label="Export my data" icon="square.and.arrow.up" onPress={() => { }} />
          </View>
          <Divider />
          <View style={{ padding: spacing.md }}>
            <SettingsRow label="Privacy policy" icon="lock.shield" onPress={() => { }} />
          </View>
        </GlassyCard>
        <ThemedText type="caption" style={{ color: colors.fg.muted, textAlign: "center" }}>
          Your data, your rules. Always.
        </ThemedText>
        <ThemedText type="caption" style={{ color: colors.fg.muted, textAlign: "center", opacity: 0.5 }}>
          Doe 1.0.0
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing["2xl"],
    paddingTop: 64,
    paddingBottom: 140,
    gap: spacing["2xl"],
  },
  profileCard: {
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  nameInput: {
    fontFamily: fonts.serif,
    fontSize: 22,
    textAlign: "center",
    borderBottomWidth: 1.5,
    paddingBottom: 4,
    minWidth: 160,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  section: {
    gap: spacing.md,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 44,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 0.5,
    marginHorizontal: spacing.md,
  },
});

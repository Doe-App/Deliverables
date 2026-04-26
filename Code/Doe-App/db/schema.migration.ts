import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const flowLevels = ["SPOTTING", "LIGHT", "MEDIUM", "HEAVY"] as const;
export type FlowLevel = (typeof flowLevels)[number];

export const symptomCategories = [
  "PHYSICAL",
  "EMOTIONAL",
  "DIGESTIVE",
  "SLEEP",
  "CUSTOM",
] as const;
export type SymptomCategory = (typeof symptomCategories)[number];

export const cyclePatterns = ["REGULAR", "IRREGULAR", "UNKNOWN"] as const;
export type CyclePattern = (typeof cyclePatterns)[number];

export const contactRoles = ["PARTNER", "FRIEND", "FAMILY"] as const;
export type ContactRole = (typeof contactRoles)[number];

export const widgetTypes = [
  "CYCLE_RING",
  "DAILY_INSIGHT",
  "PARTNER_VIEW",
  "NEXT_PERIOD",
] as const;
export type WidgetType = (typeof widgetTypes)[number];

export const widgetSizes = ["SMALL", "MEDIUM", "LARGE"] as const;
export type WidgetSize = (typeof widgetSizes)[number];

const uuid = () => crypto.randomUUID();

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
};

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(uuid),
  displayName: text("display_name"),
  ...timestamps,
});

export const userSettings = sqliteTable("user_settings", {
  id: text("id").primaryKey().$defaultFn(uuid),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  cloudSyncEnabled: integer("cloud_sync_enabled", { mode: "boolean" })
    .notNull()
    .default(false),
  lightTheme: text("light_theme_id"),
  darkTheme: text("dark_theme_id"),
  colorSchemeMode: text("color_scheme_mode"),
  hasSeenIntro: integer("has_seen_intro", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const cycleProfiles = sqliteTable("cycle_profiles", {
  id: text("id").primaryKey().$defaultFn(uuid),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  cyclePattern: text("cycle_pattern", { enum: cyclePatterns })
    .notNull()
    .default("UNKNOWN"),
  averageCycleLength: integer("average_cycle_length"),
  averagePeriodLength: integer("average_period_length"),
  ...timestamps,
});

export const cycleEntries = sqliteTable(
  "cycle_entries",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    cycleProfileId: text("cycle_profile_id")
      .notNull()
      .references(() => cycleProfiles.id, { onDelete: "cascade" }),
    startDate: integer("start_date", { mode: "timestamp_ms" }).notNull(),
    endDate: integer("end_date", { mode: "timestamp_ms" }),
    cycleLength: integer("cycle_length"),
    flow: text("flow", { enum: flowLevels }),
    notes: text("notes"),
    ...timestamps,
  },
  (t) => ({
    profileStartIdx: index("cycle_entries_profile_start_idx").on(
      t.cycleProfileId,
      t.startDate,
    ),
  }),
);

export const cyclePredictions = sqliteTable(
  "cycle_predictions",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    cycleProfileId: text("cycle_profile_id")
      .notNull()
      .references(() => cycleProfiles.id, { onDelete: "cascade" }),
    menstrualStart: integer("menstrual_start", { mode: "timestamp_ms" }).notNull(),
    menstrualEnd: integer("menstrual_end", { mode: "timestamp_ms" }).notNull(),
    follicularStart: integer("follicular_start", { mode: "timestamp_ms" }).notNull(),
    follicularEnd: integer("follicular_end", { mode: "timestamp_ms" }).notNull(),
    ovulationDate: integer("ovulation_date", { mode: "timestamp_ms" }).notNull(),
    lutealStart: integer("luteal_start", { mode: "timestamp_ms" }).notNull(),
    lutealEnd: integer("luteal_end", { mode: "timestamp_ms" }).notNull(),
    confidence: real("confidence").notNull(),
    algorithmUsed: text("algorithm_used").notNull(),
    generatedAt: integer("generated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => ({
    profileGeneratedIdx: index("cycle_predictions_profile_gen_idx").on(
      t.cycleProfileId,
      t.generatedAt,
    ),
  }),
);

export const symptomTags = sqliteTable(
  "symptom_tags",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    category: text("category", { enum: symptomCategories }).notNull(),
    icon: text("icon"),
    color: text("color"),
    isCustom: integer("is_custom", { mode: "boolean" }).notNull().default(false),
    ...timestamps,
  },
  (t) => ({
    userNameUq: uniqueIndex("symptom_tags_user_name_uq").on(t.userId, t.name),
  }),
);

export const symptomLogs = sqliteTable(
  "symptom_logs",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => symptomTags.id, { onDelete: "restrict" }),
    cycleEntryId: text("cycle_entry_id").references(() => cycleEntries.id, {
      onDelete: "set null",
    }),
    severity: integer("severity").notNull(),
    loggedAt: integer("logged_at", { mode: "timestamp_ms" }).notNull(),
    note: text("note"),
    ...timestamps,
  },
  (t) => ({
    userLoggedIdx: index("symptom_logs_user_logged_idx").on(t.userId, t.loggedAt),
    tagIdx: index("symptom_logs_tag_idx").on(t.tagId),
  }),
);

export const shareProfiles = sqliteTable("share_profiles", {
  id: text("id").primaryKey().$defaultFn(uuid),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const shareContacts = sqliteTable(
  "share_contacts",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    shareProfileId: text("share_profile_id")
      .notNull()
      .references(() => shareProfiles.id, { onDelete: "cascade" }),
    displayName: text("display_name").notNull(),
    role: text("role", { enum: contactRoles }).notNull(),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    ...timestamps,
  },
  (t) => ({
    profileIdx: index("share_contacts_profile_idx").on(t.shareProfileId),
  }),
);

export const permissionSets = sqliteTable("permission_sets", {
  id: text("id").primaryKey().$defaultFn(uuid),
  shareContactId: text("share_contact_id")
    .notNull()
    .unique()
    .references(() => shareContacts.id, { onDelete: "cascade" }),
  canSeeCyclePhase: integer("can_see_cycle_phase", { mode: "boolean" })
    .notNull()
    .default(false),
  canSeeMood: integer("can_see_mood", { mode: "boolean" })
    .notNull()
    .default(false),
  canSeeExactDates: integer("can_see_exact_dates", { mode: "boolean" })
    .notNull()
    .default(false),
  canSeeSymptoms: integer("can_see_symptoms", { mode: "boolean" })
    .notNull()
    .default(false),
  ...timestamps,
});

export const shareLinks = sqliteTable(
  "share_links",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    shareContactId: text("share_contact_id")
      .notNull()
      .references(() => shareContacts.id, { onDelete: "cascade" }),
    encryptedToken: text("encrypted_token").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
    revokedAt: integer("revoked_at", { mode: "timestamp_ms" }),
    ...timestamps,
  },
  (t) => ({
    contactIdx: index("share_links_contact_idx").on(t.shareContactId),
  }),
);

export const widgets = sqliteTable(
  "widgets",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type", { enum: widgetTypes }).notNull(),
    size: text("size", { enum: widgetSizes }).notNull(),
    config: text("config", { mode: "json" }).$type<Record<string, unknown>>(),
    position: integer("position").notNull().default(0),
    ...timestamps,
  },
  (t) => ({
    userIdx: index("widgets_user_idx").on(t.userId),
  }),
);

export const consentEvents = sqliteTable(
  "consent_events",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    action: text("action").notNull(),
    detail: text("detail", { mode: "json" }).$type<Record<string, unknown>>(),
    occurredAt: integer("occurred_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => ({
    userOccurredIdx: index("consent_events_user_idx").on(t.userId, t.occurredAt),
  }),
);

export const syncDevices = sqliteTable(
  "sync_devices",
  {
    id: text("id").primaryKey().$defaultFn(uuid),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    deviceName: text("device_name").notNull(),
    devicePublicKey: text("device_public_key").notNull(),
    lastSyncedAt: integer("last_synced_at", { mode: "timestamp_ms" }),
    ...timestamps,
  },
  (t) => ({
    userIdx: index("sync_devices_user_idx").on(t.userId),
  }),
);

export const usersRelations = relations(users, ({ one, many }) => ({
  settings: one(userSettings),
  cycleProfile: one(cycleProfiles),
  shareProfile: one(shareProfiles),
  symptomTags: many(symptomTags),
  symptomLogs: many(symptomLogs),
  widgets: many(widgets),
  consentEvents: many(consentEvents),
  syncDevices: many(syncDevices),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, { fields: [userSettings.userId], references: [users.id] }),
}));

export const cycleProfilesRelations = relations(cycleProfiles, ({ one, many }) => ({
  user: one(users, { fields: [cycleProfiles.userId], references: [users.id] }),
  entries: many(cycleEntries),
  predictions: many(cyclePredictions),
}));

export const cycleEntriesRelations = relations(cycleEntries, ({ one, many }) => ({
  profile: one(cycleProfiles, {
    fields: [cycleEntries.cycleProfileId],
    references: [cycleProfiles.id],
  }),
  symptomLogs: many(symptomLogs),
}));

export const cyclePredictionsRelations = relations(cyclePredictions, ({ one }) => ({
  profile: one(cycleProfiles, {
    fields: [cyclePredictions.cycleProfileId],
    references: [cycleProfiles.id],
  }),
}));

export const symptomTagsRelations = relations(symptomTags, ({ one, many }) => ({
  user: one(users, { fields: [symptomTags.userId], references: [users.id] }),
  logs: many(symptomLogs),
}));

export const symptomLogsRelations = relations(symptomLogs, ({ one }) => ({
  user: one(users, { fields: [symptomLogs.userId], references: [users.id] }),
  tag: one(symptomTags, {
    fields: [symptomLogs.tagId],
    references: [symptomTags.id],
  }),
  cycleEntry: one(cycleEntries, {
    fields: [symptomLogs.cycleEntryId],
    references: [cycleEntries.id],
  }),
}));

export const shareProfilesRelations = relations(shareProfiles, ({ one, many }) => ({
  user: one(users, { fields: [shareProfiles.userId], references: [users.id] }),
  contacts: many(shareContacts),
}));

export const shareContactsRelations = relations(shareContacts, ({ one, many }) => ({
  profile: one(shareProfiles, {
    fields: [shareContacts.shareProfileId],
    references: [shareProfiles.id],
  }),
  permissions: one(permissionSets),
  links: many(shareLinks),
}));

export const permissionSetsRelations = relations(permissionSets, ({ one }) => ({
  contact: one(shareContacts, {
    fields: [permissionSets.shareContactId],
    references: [shareContacts.id],
  }),
}));

export const shareLinksRelations = relations(shareLinks, ({ one }) => ({
  contact: one(shareContacts, {
    fields: [shareLinks.shareContactId],
    references: [shareContacts.id],
  }),
}));

export const widgetsRelations = relations(widgets, ({ one }) => ({
  user: one(users, { fields: [widgets.userId], references: [users.id] }),
}));

export const consentEventsRelations = relations(consentEvents, ({ one }) => ({
  user: one(users, { fields: [consentEvents.userId], references: [users.id] }),
}));

export const syncDevicesRelations = relations(syncDevices, ({ one }) => ({
  user: one(users, { fields: [syncDevices.userId], references: [users.id] }),
}));
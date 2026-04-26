import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userSettings } from "@/db/schema";
import {
  LIGHT_THEME_IDS,
  DARK_THEME_IDS,
  defaultThemeSettings,
} from "@/constants/theme";
import { GUEST_USER_ID } from "./account";

export const LightThemeSchema = z.enum(LIGHT_THEME_IDS);
export const DarkThemeSchema = z.enum(DARK_THEME_IDS);
export const ColorSchemeModeSchema = z.enum(["system", "light", "dark"]);

export const ThemeSettingsSchema = z.object({
  colorSchemeMode: ColorSchemeModeSchema.default("system"),
  lightTheme: LightThemeSchema.default("doe"),
  darkTheme: DarkThemeSchema.default("space"),
});

export type ThemeSettings = z.infer<typeof ThemeSettingsSchema>;

export async function loadThemeSettings(): Promise<ThemeSettings> {
  const row = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, GUEST_USER_ID),
  });
  if (!row) return defaultThemeSettings;
  return ThemeSettingsSchema.parse({
    colorSchemeMode: row.colorSchemeMode,
    lightTheme: row.lightTheme,
    darkTheme: row.darkTheme,
  });
}

export async function saveThemeSettings(
  settings: ThemeSettings
): Promise<void> {
  const validated = ThemeSettingsSchema.parse(settings);
  await db
    .insert(userSettings)
    .values({
      userId: GUEST_USER_ID,
      lightTheme: validated.lightTheme,
      darkTheme: validated.darkTheme,
      colorSchemeMode: validated.colorSchemeMode,
    })
    .onConflictDoUpdate({
      target: userSettings.userId,
      set: {
        lightTheme: validated.lightTheme,
        darkTheme: validated.darkTheme,
        colorSchemeMode: validated.colorSchemeMode,
        updatedAt: new Date(),
      },
    });
}

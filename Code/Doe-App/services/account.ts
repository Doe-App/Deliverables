import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, userSettings } from "@/db/schema";

// Hardcoded until auth exists — seeded once during app init (see AppInitializer).
export const GUEST_USER_ID = "guest";

/** Called once at startup after migrations. Safe to call multiple times. */
export async function seedGuestUser(): Promise<void> {
  await db.insert(users).values({ id: GUEST_USER_ID }).onConflictDoNothing();
}

const ProfileSchema = z.object({
  displayName: z.string().nullable().default(null),
  cloudSyncEnabled: z.boolean().default(false),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const defaultProfile: Profile = {
  displayName: null,
  cloudSyncEnabled: false,
};

export async function loadProfile(): Promise<Profile> {
  const user = await db.query.users.findFirst({
    where: eq(users.id, GUEST_USER_ID),
  });
  const settings = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, GUEST_USER_ID),
  });
  return ProfileSchema.parse({
    displayName: user?.displayName ?? null,
    cloudSyncEnabled: settings?.cloudSyncEnabled ?? false,
  });
}

export async function saveProfile(patch: Partial<Profile>): Promise<void> {
  if (patch.displayName !== undefined) {
    await db
      .update(users)
      .set({ displayName: patch.displayName, updatedAt: new Date() })
      .where(eq(users.id, GUEST_USER_ID));
  }
  if (patch.cloudSyncEnabled !== undefined) {
    await db
      .update(userSettings)
      .set({ cloudSyncEnabled: patch.cloudSyncEnabled, updatedAt: new Date() })
      .where(eq(userSettings.userId, GUEST_USER_ID));
  }
}

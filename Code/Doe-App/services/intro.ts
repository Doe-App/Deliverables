import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userSettings } from "@/db/schema";
import { GUEST_USER_ID } from "./account";

export async function loadIntroStatus(): Promise<boolean> {
  const row = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, GUEST_USER_ID),
  });
  return row?.hasSeenIntro ?? false;
}

export async function markIntroSeen(): Promise<void> {
  await db
    .insert(userSettings)
    .values({ userId: GUEST_USER_ID, hasSeenIntro: true })
    .onConflictDoUpdate({
      target: userSettings.userId,
      set: { hasSeenIntro: true, updatedAt: new Date() },
    });
}
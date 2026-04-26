import { create } from "zustand";
import {
  loadProfile,
  saveProfile,
  defaultProfile,
  type Profile,
} from "@/services/account";

interface AccountStore {
  profile: Profile;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setDisplayName: (name: string | null) => Promise<void>;
  setCloudSync: (enabled: boolean) => Promise<void>;
}

export const useAccount = create<AccountStore>((set, get) => ({
  profile: defaultProfile,
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;
    const profile = await loadProfile();
    set({ profile, hydrated: true });
  },

  setDisplayName: async (name) => {
    set((s) => ({ profile: { ...s.profile, displayName: name } }));
    await saveProfile({ displayName: name });
  },

  setCloudSync: async (enabled) => {
    set((s) => ({ profile: { ...s.profile, cloudSyncEnabled: enabled } }));
    await saveProfile({ cloudSyncEnabled: enabled });
  },
}));

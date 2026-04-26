import { create } from "zustand";
import { loadIntroStatus, markIntroSeen } from "@/services/intro";

interface IntroStore {
  hasSeenIntro: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  markSeen: () => void;
}

export const useIntroStore = create<IntroStore>((set) => ({
  hasSeenIntro: false,
  hydrated: false,

  hydrate: async () => {
    const hasSeenIntro = await loadIntroStatus();
    set({ hasSeenIntro, hydrated: true });
  },

  markSeen: () => {
    set({ hasSeenIntro: true });
    markIntroSeen().catch(console.error);
  },
}));
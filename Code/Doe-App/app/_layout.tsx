import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/constants/theme-provider";
import { useFonts, Gabarito_400Regular, Gabarito_700Bold } from "@expo-google-fonts/gabarito";
import { Fraunces_900Black } from "@expo-google-fonts/fraunces/900Black";
import { IBMPlexMono_400Regular } from "@expo-google-fonts/ibm-plex-mono/400Regular";
import { Lora_400Regular } from "@expo-google-fonts/lora/400Regular";
import { useThemeSettings } from "@/store/use-theme-settings";
import { useAccount } from "@/store/use-account";
import { useIntroStore } from "@/store/use-intro-store";
import { db } from "@/db";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { seedGuestUser } from "@/services/account";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const hydrate = useThemeSettings((s) => s.hydrate);
  const hydrateAccount = useAccount((s) => s.hydrate);
  const hydrateIntro = useIntroStore((s) => s.hydrate);

  useEffect(() => {
    (async () => {
      try {
        await migrate(db, migrations);
        await seedGuestUser();
      } catch (e) {
        console.error("DB init failed:", e);
      }
      try {
        await hydrate();
        await hydrateAccount();
        await hydrateIntro();
      } catch (e) {
        console.error("Hydration failed:", e);
      }
      setReady(true);
    })();
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}

function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <NavigationThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {children}
    </NavigationThemeProvider>
  );
}

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Fraunces: Fraunces_900Black,
    Lora: Lora_400Regular,
    Gabarito: Gabarito_400Regular,
    "Gabarito-Bold": Gabarito_700Bold,
    "IBM Plex Mono": IBMPlexMono_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <AppInitializer>
      <ThemeProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <NavigationWrapper>
          <Stack>
            <Stack.Screen name="intro" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
        </NavigationWrapper>
      </ThemeProvider>
    </AppInitializer>
  );
}

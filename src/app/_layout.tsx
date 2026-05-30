import { useAuthStore } from "@/stores";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    console.log(`开始检测登录状态`, hasHydrated, isAuthenticated);

    if (!hasHydrated) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      console.log("未登录且不在 (auth) 组");
      // 未登录且不在 (auth) 组，踢回登录页
      router.replace("/(auth)/sign-in");
    } else if (isAuthenticated && inAuthGroup) {
      console.log("已登录且在 (auth) 组");
      // 已登录且在 (auth) 组，直接送回主应用
      router.replace("/(app)");
    }
  }, [isAuthenticated, hasHydrated]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

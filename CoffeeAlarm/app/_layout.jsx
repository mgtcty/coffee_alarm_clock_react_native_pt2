import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";
import CombinedProviders from "@/context/OverallCoffeeDateContext";
import { NotificationProvider } from "@/context/NotificationContext"

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <CombinedProviders>
          <NotificationProvider>
            <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="index"/>
              <Stack.Screen name="schedule"/>
              <Stack.Screen name="dates/[dateId]"/>
            </Stack>
          </NotificationProvider>
        </CombinedProviders>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

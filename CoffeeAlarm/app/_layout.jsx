import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";
import { DateProvider, DateContext } from "../context/DateContext";
import CombinedProviders from "@/context/OverallCoffeeDateContext";
import { useNotificationPermission, setNotificationAlarm } from "@/hooks/Notifications";
import { useContext, useEffect } from "react";

export default function RootLayout() {
  const permission = useNotificationPermission()
  const { nearestDate } = useContext(DateContext) // change this context into their individual context

  useEffect(() => {
    setNotificationAlarm();
  }, []);

  return (
    <ThemeProvider>
      <DateProvider>
      <SafeAreaProvider>
        <CombinedProviders>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="schedule"/>
            <Stack.Screen name="dates/[dateId]"/>
          </Stack>
        </CombinedProviders>
      </SafeAreaProvider>
      </DateProvider>
    </ThemeProvider>
  )
}

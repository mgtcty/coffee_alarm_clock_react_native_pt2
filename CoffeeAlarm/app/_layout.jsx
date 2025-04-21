import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";
import { DateProvider } from "../context/DateContext";
import useNotificationPermission from "@/hooks/ReqNotificationPermission";

export default function RootLayout() {
  const permission = useNotificationPermission()

  return (
    <ThemeProvider>
      <DateProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="schedule"/>
          <Stack.Screen name="dates/[dateId]"/>
        </Stack>
      </SafeAreaProvider>
      </DateProvider>
    </ThemeProvider>
  )
}

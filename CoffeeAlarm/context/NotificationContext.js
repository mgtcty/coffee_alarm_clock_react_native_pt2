import { useEffect, useState, createContext } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const NotificationContext = createContext({})

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function NotificationProvider({ children }) {
  const [permGranted, setPermGranted] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const granted = await initializePermissionSetting();
      setPermGranted(granted);
    };
    initialize();
  }, []);

  return (
    <NotificationContext.Provider value={{ permGranted, setPermGranted }}>
      {children}
    </NotificationContext.Provider>
  );
}

async function initializePermissionSetting() {
  if (Platform.OS !== 'web') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === 'granted';
  }
  return false;
}

export async function scheduleNotificationAlarm(alarmInfo) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Coffee Date ☕",
      body: "It's time for your coffee with Kuromi!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      hour: alarmInfo.hour,
      minute: alarmInfo.minute,
      weekday: alarmInfo.day+1
    },
  });
}
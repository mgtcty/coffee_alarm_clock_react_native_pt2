import { useState, createContext } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export const NotificationContext = createContext({})

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const NotificationProvider = async ({ children }) => {
    const [permGranted , setPermGranted] = useState(false)

    useEffect(() => {
        const initialize = async () => {
        const granted = await initializePermissionSetting()
        setPermGranted(granted)
        };

        initialize();
    }, []);

    return <NotificationContext.Provider value={{permGranted, setPermGranted}}>
        {children}
    </NotificationContext.Provider>
}

async function initializePermissionSetting() {
    // return current perms, if not granted request for perms
    if (Device.isDevice) {
        const { status: existingStatus} = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus != 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        return finalStatus == 'granted'
    }
    return false
}

export async function scheduleNotificationAlarm(alarmTrigger) {
  const alarmTrigger = alarmTrigger || {seconds: 30}
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Coffee Date ☕",
      body: "It's time for your coffee with Kuromi!",
    },
    trigger: alarmTrigger,
  })
}
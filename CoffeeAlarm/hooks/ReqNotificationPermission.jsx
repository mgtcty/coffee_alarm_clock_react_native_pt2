import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

export default function useNotificationPermission() {
  const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      const settings = await Notifications.getPermissionsAsync();

      if (!settings.granted) {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status !== 'granted') {
          alert('Please enable notifications to use alarm features!');
          setNotificationPermissionGranted(false);
        } else {
          setNotificationPermissionGranted(true);
        }
      } else {
        setNotificationPermissionGranted(true);
      }
    };

    checkAndRequestPermission();
  }, []);

  return notificationPermissionGranted;
}

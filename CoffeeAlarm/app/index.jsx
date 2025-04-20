import { Text, View, Appearance, SafeAreaView, Image, Pressable, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Footer from "@/components/footer";
import useStyles from "@/hooks/useStyles";
import ThemeAndAlarmScheduling from "@/components/themeAndAlarmControls";
import * as Notifications from 'expo-notifications';

export default function Index() {
  const styles = useStyles();
  const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(null); // remove once done with development

  // gain access to notifications
  useEffect(() => {
    const checkAndRequestPermission = async () => {
      // get permissiom from user
      const settings = await Notifications.getPermissionsAsync()
  
      // check if already granted, if not ask for permission
      if (!settings.granted) {
        const { status } = await Notifications.requestPermissionsAsync()
  
        if (status !== 'granted') {
          alert('Please enable notifications to use alarm features!')
          setNotificationPermissionGranted(false)
        } else {
          setNotificationPermissionGranted(true)
        }
      } else {
        setNotificationPermissionGranted(true)
      }
    }
    checkAndRequestPermission();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.UpperSettingContainer}>
        <Text style={styles.text}>
          Dwink!! Notification permission: {notificationPermissionGranted === null 
            ? "Checking..." 
            : notificationPermissionGranted 
              ? "Granted ✅" 
              : "Denied ❌"}
        </Text>
      </View>
      <ThemeAndAlarmScheduling/>
      <View style={styles.middleSettingContainer}>
        <Text style={styles.text}>
          button clicking area
        </Text>
      </View>
      <Footer pageName="/index"/>
    </SafeAreaView>
  );
}

import { Text, View, Appearance, SafeAreaView, Image, Pressable, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { DateContext } from "../context/DateContext";
import Footer from "@/components/footer";
import useStyles from "@/hooks/useStyles";
import ThemeAndAlarmScheduling from "@/components/themeAndAlarmControls";

export default function Index() {
  const styles = useStyles();
  const { nearestDate } = useContext(DateContext) // change this context into their individual context

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.UpperSettingContainer}>
        <Text style={styles.text}>
          drink in: {nearestDate ? nearestDate.hour : null}
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

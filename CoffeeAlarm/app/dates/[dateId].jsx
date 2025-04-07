import { Text, View, Appearance, SafeAreaView, Pressable, StyleSheet, Image, Vibration } from "react-native"
import { TimerPicker } from "react-native-timer-picker"
import { useContext, useState, useEffect, useCallback } from "react"
import { DateContext } from "@/context/DateContext"
import { ThemeContext } from "@/context/ThemeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Styles from "@/components/Styles"
import Animated, { LinearTransition } from "react-native-reanimated"
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import * as Haptics from "expo-haptics"
import { COFFEE_IMAGES } from "@/constants/Coffees"
import { SANRIO_CHAR_IMAGES } from "@/constants/SanrioDates"
import TimeScheduler from "@/components/timeScheduler"
import DayScheduler from "@/components/dayScheduler"

export default function Setting() {
  const styles = Styles()
  const router = useRouter()
  const { days, setDay, isAdding,
    sanrioChar, setSanrioChar, coffeeDrink, setCoffeeDrink,
    coffeeDate, setCoffeeDate, existingCoffee,
    highestCoffeeId, setCoffeeId, coffeeDates, setCoffeeDates  } = useContext(DateContext)

  const addCoffeeDate = () => {
    // if they are adding, add the coffeeDate and update the highestCoffeeId, else just update the modified date
    if (isAdding) {
      // alert the user if there are any unfilled value
      if (!Object.values(coffeeDate).some(value => value === null || value === undefined)) {
        router.push("/schedule");
        setCoffeeId(highestCoffeeId+1)
        //TODO: ADD LOGIC FOR ADDING NEW COFFEE DATE
      } else {
        Vibration.vibrate();
      }
    } else {
      router.push("/schedule");
      //TODO: ADD LOGIC FOR MODIFYING COFFEE DATE
    }
  };

  // TODO: change this to cancel later
  const removeCoffeeDate = () => {
    setCoffeeId(0)
    router.push("/schedule");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.UpperSettingContainer}>
        <TimeScheduler/>
        <DayScheduler/>
      </View>
      <View style={styles.middleSettingContainer}>
        <Text>
          this is the highest id: {highestCoffeeId}
        </Text>
      </View>
      <View style={styles.BottomSettingContainer}>
        <Pressable onPress={addCoffeeDate}>
          <AntDesign 
          name='pluscircle'
          size={30} 
          style={styles.alarmIcons}/>
        </Pressable>
        <Pressable onPress={removeCoffeeDate}>
          <AntDesign 
          name='minuscircle'
          size={30} 
          style={styles.alarmIcons}/>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

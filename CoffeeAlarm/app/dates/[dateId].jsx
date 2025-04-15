import { Text, View, Appearance, SafeAreaView, Pressable, StyleSheet, Vibration } from "react-native"
import { useContext, useState, useEffect, useCallback } from "react"
import { DateContext } from "@/context/DateContext"
import useStyles from "@/hooks/useStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import TimeScheduler from "@/components/timeScheduler"
import DayScheduler from "@/components/dayScheduler"
import CoffeeAndCharScheduler from "@/components/coffeeAndCharScheduler"

export default function Setting() {
  const styles = useStyles()
  const router = useRouter()
  const { isAdding, coffeeDate, highestCoffeeId, setCoffeeId, setCoffeeDates  } = useContext(DateContext)

  const addCoffeeDate = () => {
    // if they are adding, add the coffeeDate and update the highestCoffeeId, else just update the modified date
    if (isAdding) {
      // alert the user if there are any unfilled value
      if (!Object.values(coffeeDate).some(value => value === null || value === undefined)) {
        router.push("/schedule");
        setCoffeeId(highestCoffeeId+1)
        setCoffeeDates(prevDates => [...prevDates, coffeeDate])
      } else {
        Vibration.vibrate();
      }
    } else {
      router.push("/schedule");
      setCoffeeDates(prevDates => prevDates.map(prevDate => prevDate.id == coffeeDate.id ? coffeeDate : prevDate))
    }
  };

  // TODO: change this to cancel later, features must include minusing the highest ID since they didnt add a new one
  const removeCoffeeDate = async () => {
    try {
      const updatedDates = [];
      setCoffeeDates(updatedDates);
      setCoffeeId(0)

      // save to AsyncStorage AFTER updating state
      await AsyncStorage.setItem("coffeeDates", JSON.stringify(updatedDates));

      router.push("/schedule");
    } catch (e) {
      console.error("Error removing coffee date:", e);
    }
  };

  // fix optimization error with: <TimeScheduler/>,
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.UpperSettingContainer}>
        <TimeScheduler/>
        <Text>{coffeeDate.hour}:{coffeeDate.minute} with coffee of: {coffeeDate.coffee}</Text>
      </View>
      <View style={styles.seperator}/>
      <DayScheduler/>
      <View style={styles.middleSettingContainer}>
        <CoffeeAndCharScheduler/>
      </View>
      <View style={styles.BottomSettingContainer}>
        <Pressable onPress={addCoffeeDate}>
          <AntDesign 
          name='pluscircle'
          size={36} 
          style={styles.alarmIcons}/>
        </Pressable>
        <Pressable onPress={removeCoffeeDate}>
          <AntDesign 
          name='minuscircle'
          size={36} 
          style={styles.alarmIcons}/>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

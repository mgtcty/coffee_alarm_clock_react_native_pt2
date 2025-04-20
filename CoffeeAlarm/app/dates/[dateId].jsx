import { Text, View, SafeAreaView, Pressable, StyleSheet, Vibration } from "react-native"
import { useContext, useCallback, useEffect } from "react"
import { DateContext } from "@/context/DateContext"
import useStyles from "@/hooks/useStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from "expo-router"
import TimeScheduler from "@/components/timeScheduler"
import DayScheduler from "@/components/dayScheduler"
import CoffeeAndCharScheduler from "@/components/coffeeAndCharScheduler"

export default function Setting() {
  const styles = useStyles()
  const router = useRouter()
  const { isAdding, coffeeDate, highestCoffeeId, setCoffeeId, setCoffeeDates, coffeeDates, setNearestDate, nearestDate } = useContext(DateContext)

  const arrangeCoffeeDates = (dates) => {
      const now = new Date()
      const nowTime = now.getTime()
  
      const arrangedCoffeeList = dates
        .map(date => {
          const target = new Date()
          const nowDay = now.getDay()
  
          // calculate how many days to add
          let dayDiff = date.day - nowDay;
          if (dayDiff < 0 || (dayDiff === 0 && (date.hour < now.getHours() || (date.hour === now.getHours() && date.minute <= now.getMinutes())))) {
            // if day is behind or it's today but earlier, go to next week's same day
            dayDiff += 7
          }
  
          target.setDate(now.getDate() + dayDiff)
          target.setHours(date.hour)
          target.setMinutes(date.minute)
          target.setSeconds(0)
          target.setMilliseconds(0)
  
          const diff = target.getTime() - nowTime
  
          return {
            ...date,
            timeUntilAlarm: diff,
            timestamp: target.getTime(),
          }
        })
        .sort((a, b) => a.timeUntilAlarm - b.timeUntilAlarm) // sort nearest to farthest

      return arrangedCoffeeList
  };

  const addCoffeeDate = useCallback(() => {
    // if they are adding, add the coffeeDate and update the highestCoffeeId, else just update the modified date
    if (isAdding) {
      const allFieldsFilled = Object.values(coffeeDate).every(
        value => value !== null && value !== undefined
      )

      // alert the user if there are any unfilled value
      if (allFieldsFilled) {
        const updated = [...coffeeDates, {...coffeeDate, id:highestCoffeeId+1}]
        const sorted = arrangeCoffeeDates(updated)
        setCoffeeId(highestCoffeeId+1)
        setCoffeeDates(sorted)
        setNearestDate(sorted[0])
        router.push("/schedule");
      } else {
        Vibration.vibrate();
      }
    } else {
      const updated = coffeeDates.map(prevDate => prevDate.id == coffeeDate.id ? coffeeDate : prevDate)
      const sorted = arrangeCoffeeDates(updated)
      setCoffeeDates(sorted)
      router.push("/schedule");
    }
  }, [isAdding, coffeeDate, highestCoffeeId, setCoffeeDates, setCoffeeId, router]);

  // TODO: change this to cancel later, features must include minusing the highest ID since they didnt add a new one
  const removeCoffeeDate = async () => {
      const updatedDates = [];
      setCoffeeDates(updatedDates);
      setCoffeeId(0)
      setNearestDate(null)
    
      // save to AsyncStorage AFTER updating state
      await AsyncStorage.setItem("coffeeDates", JSON.stringify(updatedDates));

      router.push("/schedule");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.UpperSettingContainer}>
        <TimeScheduler/>
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

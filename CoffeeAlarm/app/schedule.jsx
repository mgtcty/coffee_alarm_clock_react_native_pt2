import { Text, View, SafeAreaView, Pressable, Image, FlatList, ImageBackground } from "react-native";
import Footer from "@/components/footer";
import useStyles from "@/hooks/useStyles";
import ThemeAndAlarmScheduling from "@/components/themeAndAlarmControls";
import { useEffect, useState, useContext, memo } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { DateContext } from "@/context/DateContext"
import { COFFEE_IMAGES } from "@/constants/Coffees"
import { SANRIO_CHAR_IMAGES } from "@/constants/SanrioDates"
import * as Notifications from 'expo-notifications';

const days = {
  0:"Sun",
  1:"Mon",
  2:"Tues",
  3:"Wed",
  4:"Thurs",
  5:"Fri",
  6:"Sat",
}

export default function Schedule() {
  const { highestCoffeeId, setCoffeeId, coffeeDates, setCoffeeDates, setIsAdding, setCoffeeDate, nearestDate, setNearestDate } = useContext(DateContext) // change this context into their individual context
  const router = useRouter()
  const styles = useStyles()

  const deleteCoffeeDate = () => {
    
  }

  // update the timer every minute
  useEffect(() => {
    
  }, [])

  // show if there are any coffeeDate or not
  const CoffeeDateReminder = () => {
    const hasDate = nearestDate ? 
      <Text style={styles.text}>
        Next Coffee Date in: {nearestDate.hour}:{nearestDate.minute}
      </Text> 
      : <Text style={styles.text}>
        No Coffee Date
      </Text>
    return hasDate
  }

  // prepare modifying the clicked coffeeDate
  const handleDates = (dateId) => {
    setIsAdding(false)
    let selectedCoffeeDate = coffeeDates.find(coffeeDate => coffeeDate.id === dateId);
    setCoffeeDate(selectedCoffeeDate)
    router.push(`/dates/${dateId}`)
  }

  let x = 11

  // renders each individual coffeeDate in coffeeDates
  const coffeeDateRenderer = ({ item }) => {
      return (
        <ImageBackground 
        source={COFFEE_IMAGES[item.coffee-1]}
        style={styles.arrangedImageContainer}>
          <Pressable onPress={() => handleDates(item.id)}>
            <Text style={styles.text}>{item.id} has time of: {item.hour <= 12? item.hour: item.hour-12}:{item.minute} {item.ampm} and at day {days[item.day]} with coffee of {item.coffee} and character of {item.sanrioChar}</Text>
            <Image source={SANRIO_CHAR_IMAGES[item.sanrioChar-1]} style={styles.coffeeDateImages}/>
          </Pressable>
        </ImageBackground>
      );
  };

  return (   
    <SafeAreaView style={styles.container}>
      <View style={styles.UpperSettingContainer}>
        <CoffeeDateReminder/>
      </View>
      <ThemeAndAlarmScheduling/>
      <View style={styles.middleSettingContainer}>
        <FlatList
          data={coffeeDates}
          renderItem={coffeeDateRenderer}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Footer pageName="/schedule"/>
    </SafeAreaView>
  );
}

import { Text, View, Appearance, SafeAreaView, Pressable, Image, StyleSheet } from "react-native";
import Footer from "@/components/footer";
import Styles from "@/components/Styles";
import ThemeAndAlarmScheduling from "@/components/themeAndAlarmControls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useEffect, useState, useContext } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { DateContext } from "@/context/DateContext"
import { COFFEE_ITEMS, COFFEE_IMAGES } from "@/constants/Coffees"
import { SANRIO_CHAR_ITEMS, SANRIO_CHAR_IMAGES } from "@/constants/SanrioDates"


const days = {
  0:"S",
  1:"M",
  2:"T",
  3:"W",
  4:"T",
  5:"F",
  6:"S",
}

export default function Schedule() {
  const { highestCoffeeId, setCoffeeId, coffeeDates, setCoffeeDates } = useContext(DateContext)
  const router = useRouter()
  const styles = Styles()

  const deleteCoffeeDate = () => {
    
  }

  const handleDates = (dateId) => {
    router.push(`/dates/${dateId}`)
  }

  const coffeeDateRenderer = ({ item }) => {
    try{
      return (
        <View>
          <Pressable onPress={() => handleDates(item.id)}>
            <Text style={styles.text}>{item.id} has time of: {item.hour <= 12? item.hour: item.hour-12}:{item.minute} {item.ampm} and at day {item.day} 
               with coffee of {item.coffee} and character of {item.sanrioChar}</Text>
            <Image source={SANRIO_CHAR_IMAGES[item.sanrioChar]} style={styles.coffeeDateImages}/>
            <Image source={COFFEE_IMAGES[item.coffee]} style={styles.coffeeDateImages}/>
          </Pressable>
        </View>
      );
    } catch (e) {
      console.error("Error rendering dates:", e);
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.UpperSettingContainer}>
        <Text style={styles.text}>
          No Coffee Date
        </Text>
      </View>
      <ThemeAndAlarmScheduling/>
      <View style={styles.middleSettingContainer}>
        <Animated.FlatList
          data={coffeeDates}
          renderItem={coffeeDateRenderer}
          keyExtractor={item => item.id}
          itemLayoutAnimation={LinearTransition}
        />
      </View>
      <Footer pageName="/schedule"/>
    </SafeAreaView>
  );
}

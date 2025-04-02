import { Text, View, Appearance, SafeAreaView, Pressable, StyleSheet } from "react-native";
import Footer from "@/components/footer";
import Styles from "@/components/Styles";
import ThemeAndAlarmScheduling from "@/components/themeAndAlarmControls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useEffect, useState, useContext } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { DateContext } from "@/context/DateContext"

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
            <Text style={styles.text}>{item.id} has time of: {item.hour}:{item.minute} {item.ampm} and at day {item.day} 
               with coffee of {item.coffee} and character of {item.sanrioChar}</Text>
          </Pressable>
        </View>
      );
    } catch (e) {
      console.error("Error rendering dates:", e);
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>
          No Coffee Date
        </Text>
      </View>
      <ThemeAndAlarmScheduling/>
      <View>
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

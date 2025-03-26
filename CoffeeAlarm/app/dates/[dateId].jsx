import { Text, View, Appearance, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import { DateContext } from "@/context/DateContext"
import { ThemeContext } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "@/components/Styles";
import Animated, { LinearTransition } from "react-native-reanimated";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Setting() {
  const { colorScheme, theme } = useContext(ThemeContext)
  const [days, setDay] = useState([{name:'S', id:0, set:true}, {name:'M', id:1, set:false}, {name:'T', id:2, set:false}, 
    {name:'W', id:3, set:false}, {name:'T', id:4, set:false}, {name:'F', id:5, set:false}, {name:'S', id:6, set:false}])
  const styles = Styles()
  const router = useRouter()
  const { dateId } = useLocalSearchParams()
  const { highestCoffeeId, setCoffeeId, coffeeDates, setCoffeeDates  } = useContext(DateContext)
  const hasDates = coffeeDates && coffeeDates.length

  
  // find existing coffee date or create a new one
  const existingCoffee =  hasDates ? coffeeDates.find(date => date.id.toString() == dateId) : null

  const [coffeeDate, setCoffeeDate] = useState(
    existingCoffee || {
      id: parseInt(dateId),
      day: 0,
      hour: 2, // to change to null once feature done
      minute: 3, // to change to null once feature done
      ampm: "pm", // to change to null once feature done
      coffee: "viet coff", // to change to null once feature done
      sanrioChar: "Kuromi", // to change to null once feature done
    })

  // add new coffee date and save to AsyncStorage
  const addCoffeeDate = async () => {
    try {
      let updatedDates = []
      // if user created a new coffee date, add it to the list else just modify the existingCoffee
      if (existingCoffee) {
        // find the previous date and update it
        updatedDates = coffeeDates.map(prevDate => prevDate.id == coffeeDate.id ? coffeeDate : prevDate)
      } else {
        updatedDates = hasDates ? [...coffeeDates, coffeeDate] : [coffeeDate];
        setCoffeeId(coffeeDate.id)
      }
      setCoffeeDates(updatedDates);

      // save to AsyncStorage AFTER updating state
      await AsyncStorage.setItem("coffeeDates", JSON.stringify(updatedDates));

      router.push("/schedule");
    } catch (e) {
      console.error("Error saving coffee date:", e);
    }
  };

  // (FYI) use this for debugging remove once not needed (FYI)
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


  const dayRenderer = ({ item }) => {

    // update coffee date and highlight to user which day they chose
    const handleDayPress = (item) => {
      setDay(days.map(day => ({...day, set: day.id == item.id ? !day.set: false})))
      setCoffeeDate({...coffeeDate, day:item.id})
    }

    try {
      return (
        <View>
          <Pressable onPress={() => handleDayPress(item)} style={styles.dayButton}>
            <Text style={[styles.dayText, item.set && styles.selectedDayText]}>{ item.name }</Text>
          </Pressable>
        </View>
      )
    } catch (e) {
      console.error("Error rendering days:", e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>
          is existing:{coffeeDate.hour}:{coffeeDate.minute} {coffeeDate.ampm}
        </Text>
        <View style={styles.daysContainer}>
          <Animated.FlatList
            data={days}
            renderItem={dayRenderer}
            keyExtractor={item => item.id}
            itemLayoutAnimation={LinearTransition}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.day}
          />
        </View>
      </View>
      <View style={styles.seperator}/>
      <View>
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
      <View style={styles.middleSettingContainer}>
        <View style={styles.coffeeDateContainer}>
          <Text style={styles.text}>Coffee:</Text>
          <Pressable>
            <Text style={styles.text}>change to FlatList</Text>
          </Pressable>
        </View>
        <View style={styles.coffeeDateContainer}>
          <Text style={styles.text}>Date:</Text>
          <Pressable>
            <Text style={styles.text}>change to FlatList</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

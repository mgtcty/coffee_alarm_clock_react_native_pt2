import { Text, View, Appearance, SafeAreaView, Pressable, StyleSheet, Image } from "react-native";
import { useContext, useState, useEffect, useCallback } from "react";
import { DateContext } from "@/context/DateContext"
import { ThemeContext } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "@/components/Styles";
import Animated, { LinearTransition } from "react-native-reanimated";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter, useLocalSearchParams } from "expo-router";
import { COFFEE_ITEMS, COFFEE_IMAGES } from "@/constants/Coffees"
import { SANRIO_CHAR_ITEMS, SANRIO_CHAR_IMAGES } from "@/constants/SanrioDates"

const initialDays = [
  { name: "S", id: 0, set: true },
  { name: "M", id: 1, set: false },
  { name: "T", id: 2, set: false },
  { name: "W", id: 3, set: false },
  { name: "T", id: 4, set: false },
  { name: "F", id: 5, set: false },
  { name: "S", id: 6, set: false }
];

export default function Setting() {
  const { colorScheme, theme } = useContext(ThemeContext)
  const [days, setDay] = useState(initialDays)
  const styles = Styles()
  const router = useRouter()
  const { dateId } = useLocalSearchParams()
  const { highestCoffeeId, setCoffeeId, coffeeDates, setCoffeeDates  } = useContext(DateContext)
  const hasDates = coffeeDates && coffeeDates.length

  
  // find existing coffee date or create a new one
  const existingCoffee =  hasDates ? coffeeDates.find(date => date.id.toString() == dateId) : null

  // add loading feature from local device

  const [coffeeDate, setCoffeeDate] = useState(() => 
    existingCoffee || {
      id: parseInt(dateId),
      day: null,
      hour: 2, // to change to null once feature done
      minute: 3, // to change to null once feature done
      ampm: "pm", // to change to null once feature done
      coffee: null, // to change to null once feature done
      sanrioChar: "Kuromi", // to change to null once feature done
    })

  // add new coffee date and save to AsyncStorage
  useEffect(() => {
    if (coffeeDates.length > 0) {
      AsyncStorage.setItem("coffeeDates", JSON.stringify(coffeeDates)).catch(e => console.error("Error saving coffee dates:", e));
    }
  }, [coffeeDates]);
  const addCoffeeDate = () => {
    setCoffeeDates(prevDates => {
      const updatedDates = existingCoffee
        ? prevDates.map(date => date.id === coffeeDate.id ? coffeeDate : date)
        : [...prevDates, coffeeDate];
  
      setCoffeeId(coffeeDate.id);
      return updatedDates;
    });

    router.push("/schedule");
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
    const handleDayPress = (selectedItem) => {
      setDay(prevDays => prevDays.map(day => ({...day,set: day.id === selectedItem.id ? !day.set : false})));
      setCoffeeDate({...coffeeDate, day:selectedItem.id})
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

  const coffeeDateRenderer = ({ item, isSanrioChar }) => {
    // update the current coffee and character on the date
    const handleCoffeeOrCharPress= () => {
      setCoffeeDate(prev => ({...prev,[isSanrioChar ? "sanrioChar" : "coffee"]: item.id}))
    }

    return (
      <View style={styles.coffeeDateRow}>
        <View>
          <Text style={styles.coffeeDateText}>{ item.name }</Text>
        </View>
        <Pressable onPress={handleCoffeeOrCharPress}>
          <Image
            source={ isSanrioChar ? SANRIO_CHAR_IMAGES[item.id-1] : COFFEE_IMAGES[item.id-1]}
            style={styles.coffeeDateImages}
          />
        </Pressable>
      </View>
    )
  }

  // memoize render functions to prevent unnecessary re-renders
  const renderDayItem = useCallback(({ item }) => dayRenderer({ item }), []);
  const renderCoffeeItem = useCallback(({ item }) => coffeeDateRenderer({ item, isSanrioChar: false }), []);
  const renderSanrioItem = useCallback(({ item }) => coffeeDateRenderer({ item, isSanrioChar: true }), []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>
          is existing:{coffeeDate.hour}:{coffeeDate.minute} {coffeeDate.ampm}
        </Text>
        <View style={styles.daysContainer}>
          <Animated.FlatList
            data={days}
            renderItem={renderDayItem}
            keyExtractor={item => item.id}
            itemLayoutAnimation={LinearTransition}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dayContainer}
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
          <Animated.FlatList
            data={COFFEE_ITEMS}
            keyExtractor={(item) => item.id.toString()}
            itemLayoutAnimation={LinearTransition}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderCoffeeItem}
            contentContainerStyle={styles.coffeeDateContainer}
          />
        </View>
        <View style={styles.coffeeDateContainer}>
          <Text style={styles.text}>Date:</Text>
          <Animated.FlatList
            data={SANRIO_CHAR_ITEMS}
            keyExtractor={(item) => item.id.toString()}
            itemLayoutAnimation={LinearTransition}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderSanrioItem}
            contentContainerStyle={styles.coffeeDateContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

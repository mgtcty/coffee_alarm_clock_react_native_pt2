import { View, Pressable, Text } from "react-native";
import Styles from "@/components/Styles";
import Animated, { LinearTransition } from "react-native-reanimated"
import { DateContext } from "@/context/DateContext"
import { useContext,useCallback } from "react";

/**
 * Function that returns a day picker module:
 * - updates the coffeeDate day parameters
 * - allows user to choose the day of the alarm
 * @param {*} None
 * @returns a day picker module
 */
export default function DayScheduler() {
    const { days, setDay, setCoffeeDate } = useContext(DateContext)
    const styles = Styles()

    const dayRenderer = ({ item }) => {
        // update coffee date and highlight to user which day they chose
        const handleDayPress = (selectedItem) => {
          setDay(prevDays => prevDays.map(day => ({...day,set: day.id === selectedItem.id ? !day.set : false})));
          setCoffeeDate(prev => ({ ...prev, day: selectedItem.id }))
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
    const renderDayItem = useCallback(({ item }) => dayRenderer({ item }), []);
    
    return (
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
    )
}
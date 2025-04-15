import { View, Pressable, Text, FlatList } from "react-native";
import useStyles from "@/hooks/useStyles";
import { DateContext } from "@/context/DateContext"
import { useContext, useCallback, useEffect, memo } from "react";

/**
 * Function that returns a day picker module:
 * - updates the coffeeDate day parameters
 * - allows user to choose the day of the alarm
 * @param {*} None
 * @returns a day picker module
 */
function DayScheduler() {
    const { days, setDay, setCoffeeDate, coffeeDate, isAdding } = useContext(DateContext)
    const styles = useStyles()

    // if the user will modify a date instead of adding one
    useEffect(() => {
      if (!isAdding && coffeeDate?.id) {
        setDay(prevDays =>
          prevDays.map(day => ({
            ...day,
            set: day.id === coffeeDate.id,
          }))
        );
      }
    }, [isAdding, coffeeDate?.id]);

    const dayRenderer = ({ item }) => {
        // update coffee date and highlight to user which day they chose
        const handleDayPress = (selectedItem) => {
          setDay(prevDays => prevDays.map(day => ({...day,
            set: day.id === selectedItem.id && selectedItem.set == false ? true : false})));
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
          <FlatList
            data={days}
            renderItem={renderDayItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dayContainer}
          />
        </View>
    )
}

export default memo(DayScheduler);
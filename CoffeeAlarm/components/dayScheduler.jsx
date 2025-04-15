import { View, Pressable, Text, FlatList } from "react-native";
import useStyles from "@/hooks/useStyles";
import { DateContext } from "@/context/DateContext"
import { useContext, useCallback, memo } from "react";

/**
 * Function that returns a day picker module:
 * - updates the coffeeDate day parameters
 * - allows user to choose the day of the alarm
 * @param {*} None
 * @returns a day picker module
 */
function DayScheduler() {
    const { days, dispatch, setCoffeeDate, coffeeDate, isAdding } = useContext(DateContext)
    const styles = useStyles()

    // used a usereducer to update the state of the days clicked
    const handleDayPress = useCallback((selectedItem) => {
      dispatch({ type: "TOGGLE_DAY", payload: selectedItem.id });
      setCoffeeDate(prev => ({ ...prev, day: selectedItem.id }));
    }, [dispatch, setCoffeeDate]);

    // renders the day array and its style
    const renderDayItem = useCallback(({ item }) => (
      <View>
        <Pressable onPress={() => handleDayPress(item)} style={styles.dayButton}>
          <Text style={[styles.dayText, item.set && styles.selectedDayText]}>
            {item.name}
          </Text>
        </Pressable>
      </View>
    ), [handleDayPress, styles]);

    return (
      <View style={styles.daysContainer}>
        <FlatList
          data={days}
          renderItem={renderDayItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayContainer}
        />
      </View>
    )
}

export default memo(DayScheduler);
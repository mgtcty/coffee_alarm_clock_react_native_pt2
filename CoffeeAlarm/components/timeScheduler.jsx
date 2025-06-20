import { TimerPicker } from "react-native-timer-picker"
import useStyles from "@/hooks/useStyles";
import { DateContext } from "@/context/DateContext"
import { DayContext } from "@/context/DayContext"
import { useContext, memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

/**
 * Function that returns a timepicker module:
 * - updates the coffeeDate parameters
 * - allows user to choose the time of the alarm
 * @param {*} None
 * @returns a timepicker module
 */
function TimeScheduler() {
    const { setCoffeeDate, coffeeDate } = useContext(DateContext) // change this context into their individual context
    const { isAdding } = useContext(DayContext)
    const styles = useStyles()

    return (
        <View style={styles.timepickerContainer}>
            <TimerPicker
                onDurationChange={(duration) => setCoffeeDate(prev => ({
                ...prev, 
                hour: duration.hours, 
                minute: duration.minutes,
                ampm: duration.hours >= 12 ? "PM" : "AM"
            }))}
                padWithNItems={1}
                use12HourPicker
                hideSeconds
                minuteLabel={""}
                amLabel="AM"
                pmLabel="PM"
                hourLimit={12}
                LinearGradient={LinearGradient}
                padHoursWithZero
                styles={styles.timePicker}
                initialValue= {isAdding ? { hours: 0, minutes: 0} : { hours: coffeeDate ? coffeeDate.hour : 0, minutes: coffeeDate ? coffeeDate.minute : 0}}
            />
        </View>
    )
}

export default memo(TimeScheduler);
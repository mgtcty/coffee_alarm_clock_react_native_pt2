import { TimerPicker } from "react-native-timer-picker"
import Styles from "@/components/Styles";
import { DateContext } from "@/context/DateContext"
import { useContext } from "react";

/**
 * Function that returns a timepicker module:
 * - updates the coffeeDate parameters
 * - allows user to choose the time of the alarm
 * @param {*} None
 * @returns a timepicker module
 */
export default function TimeScheduler() {
    const { setCoffeeDate, isAdding, coffeeDate } = useContext(DateContext)
    const styles = Styles()

    return (
        <TimerPicker
            onDurationChange={(duration) => setCoffeeDate(prev => ({
              ...prev, 
              hour: duration.hours, 
              minute: duration.minutes,
              ampm: duration.hours >= 12 ? "PM" : "AM"
          }))}
            padWithNItems={0}
            use12HourPicker
            hideSeconds
            minuteLabel={""}
            amLabel="AM"
            pmLabel="PM"
            hourLimit={12}
            styles={styles.timePicker}
            initialValue= {isAdding ? { hours: 0, minutes: 0} : { hours: coffeeDate.hour, minutes: coffeeDate.minute }}
        />
    )
}
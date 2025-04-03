import { TimerPicker } from "react-native-timer-picker"
import { LinearGradient } from "expo-linear-gradient";
import Styles from "@/components/Styles";
import { View } from "react-native";
import * as Haptics from "expo-haptics";
import { useState } from "react";

/**
 * Function that returns a control panel containing:
 * - toggle for dark and light mode
 * - button that links to another stack (scheduling an alarm)
 * @param {*} None
 * @returns a control panel for the theme and alarms
 */
export default function TimeScheduler() {
    const [currentAlarm, setCurrentAlarm] = useState({duration: { hours: number, minutes: number, seconds: number }})
    const styles = Styles()


    return (
        <TimerPicker
            onDurationChange={setCurrentAlarm(duration)}
            padWithNItems={1}
            use12HourPicker
            hideSeconds
            minuteLabel={""}
            amLabel="AM"
            pmLabel="PM"
            hourLimit={12}
            LinearGradient={LinearGradient}
            Haptics={Haptics}
            styles={styles.timePicker}
        />
    )
}
import { Text, View, Appearance, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { DateContext } from "@/context/DateContext";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from "@/components/Styles";

/**
 * Function that returns a control panel containing:
 * - toggle for dark and light mode
 * - button that links to another stack (scheduling an alarm)
 * @param {*} None
 * @returns a control panel for the theme and alarms
 */
export default function ThemeAndAlarmScheduling() {
    const { colorScheme, setColorScheme, theme, toggleTheme } = useContext(ThemeContext)
    const { highestCoffeeId } = useContext(DateContext) // coffeeId is the highest id in the list
    const styles = Styles()


    return (
        <View>
            <View style={styles.controlPanel}>
                <Pressable onPress={toggleTheme}>
                    <Feather 
                    name={colorScheme == "light" ? 'sun':'moon'}
                    style={styles.alarmIcons}
                    size={30}/>
                </Pressable>
                <Link href={`/dates/${highestCoffeeId != null ? highestCoffeeId + 1 : 1}`} asChild>
                    <Pressable>
                        <MaterialCommunityIcons 
                        name='clock-plus-outline'
                        size={30} 
                        style={styles.alarmIcons} />
                    </Pressable>
                </Link>
            </View>
            <View style={styles.seperator}/>
        </View>
    );
}
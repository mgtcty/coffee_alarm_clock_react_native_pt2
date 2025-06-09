import { View, Pressable } from "react-native";
import { Link } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { DateContext } from "@/context/DateContext";
import { DayContext, defaultDays } from "@/context/DayContext"
import { SanrioCoffeeContext } from "@/context/SanrioAndCoffeeContext"
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useStyles from "@/hooks/useStyles";

/**
 * Function that returns a control panel containing:
 * - toggle for dark and light mode
 * - button that links to another stack (scheduling an alarm)
 * @param {*} None
 * @returns a control panel for the theme and alarms
 */
export default function ThemeAndAlarmScheduling() {
    const { colorScheme, toggleTheme } = useContext(ThemeContext)
    const { highestCoffeeId } = useContext(DateContext) // change this context into their individual context // coffeeId is the highest id in the list
    const { setIsAdding, dispatch } = useContext(DayContext)
    const { setSanrioChar, setCoffeeDrink } = useContext(SanrioCoffeeContext)
    const styles = useStyles()

    // reset values everytime the user wants to add another coffeeDate
    const dateResetter = () => {
        setIsAdding(true)
        setSanrioChar(prevSanrioChars => prevSanrioChars.map(prevSanrioChar => ({...prevSanrioChar,selected:false})))
        setCoffeeDrink(prevCoffeeDrinks => prevCoffeeDrinks.map(prevCoffeeDrink => ({...prevCoffeeDrink, selected:false})))
        dispatch({ type: "RESET", payload: defaultDays })
    }


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
                    <Pressable onPress={dateResetter}>
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
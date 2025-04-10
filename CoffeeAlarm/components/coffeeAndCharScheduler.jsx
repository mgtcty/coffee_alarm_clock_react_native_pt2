import { View, Pressable, Text, Image } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated"
import Styles from "@/components/Styles";
import { DateContext } from "@/context/DateContext"
import { useContext, useCallback } from "react";
import { COFFEE_IMAGES } from "@/constants/Coffees"
import { SANRIO_CHAR_IMAGES } from "@/constants/SanrioDates"

export default function CoffeeAndCharScheduler() {
    const { setCoffeeDate, sanrioChar, setSanrioChar, coffeeDrink, setCoffeeDrink  } = useContext(DateContext)
    const styles = Styles()

    const coffeeDateRenderer = ({ item, isSanrioChar }) => {
        // update the current coffee and character on the date
        const handleCoffeeOrCharPress= () => {
            // update the date based on what is clicked (potential bug)
            setCoffeeDate(prev => ({...prev,[isSanrioChar ? "sanrioChar" : "coffee"]: item.id}))

            // highlight which character or coffee is selected
            if (isSanrioChar) {
                setSanrioChar(prevList => prevList.map(prevChar => {
                    return {
                        ...prevChar,
                        selected: prevChar.id == item.id ? ! prevChar.selected : false
                    };
                }))
            } else {
                setCoffeeDrink(prevList => prevList.map(prevCoffee => {
                    return {
                        ...prevCoffee,
                        selected: prevCoffee.id == item.id ? ! prevCoffee.selected : false
                    };
                }))
            }
        }

        return (
            <View style={styles.coffeeDateRow}>
                <Pressable onPress={handleCoffeeOrCharPress}>
                    <View style={[styles.imageWrapper, item.selected && styles.selectedImageWrapper]}>
                        <Image
                        source={ isSanrioChar ? SANRIO_CHAR_IMAGES[item.id-1] : COFFEE_IMAGES[item.id-1]}
                        style={styles.coffeeDateImages}
                        />
                    </View>
                </Pressable>
                <Text style={styles.coffeeDateText}>{ item.name }</Text>
            </View>
        )
    }

    const renderCoffeeItem = useCallback(({ item }) => coffeeDateRenderer({ item, isSanrioChar: false }), []);
    const renderSanrioItem = useCallback(({ item }) => coffeeDateRenderer({ item, isSanrioChar: true }), []);

    let x = 1
    return (
        <View style={styles.listCoffeeAndCharContainer}>
            <View style={styles.coffeeDateContainer}>
                <Text style={styles.text}>Coffee:</Text>
                <Animated.FlatList
                    data={coffeeDrink}
                    keyExtractor={(item) => item.id.toString()}
                    itemLayoutAnimation={LinearTransition}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderCoffeeItem}
                    alwaysBounceVertical
                />
            </View>
            <View style={styles.coffeeDateContainer}>
                <Text style={styles.text}>Date:</Text>
                <Animated.FlatList
                    data={sanrioChar}
                    keyExtractor={(item) => item.id.toString()}
                    itemLayoutAnimation={LinearTransition}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderSanrioItem}
                    alwaysBounceVertical
                />
            </View>
        </View>
    )
}
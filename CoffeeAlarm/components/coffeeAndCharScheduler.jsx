import { View, Pressable, Text, Image, FlatList } from "react-native";
import useStyles from "@/hooks/useStyles";
import { DateContext } from "@/context/DateContext"
import { useContext, useCallback, memo } from "react";
import { COFFEE_IMAGES } from "@/constants/Coffees"
import { SANRIO_CHAR_IMAGES } from "@/constants/SanrioDates"


function CoffeeAndCharScheduler() {
    const { setCoffeeDate, sanrioChar, setSanrioChar, coffeeDrink, setCoffeeDrink  } = useContext(DateContext)
    const styles = useStyles();

    const CoffeeCharItem = memo(function CoffeeCharItem({ item, isSanrioChar, onPress }) {
        const styles = useStyles();
      
        return (
          <View style={styles.coffeeDateRow}>
            <Pressable onPress={() => onPress(item.id)}>
              <View style={[styles.imageWrapper, item.selected && styles.selectedImageWrapper]}>
                <Image
                  source={isSanrioChar ? SANRIO_CHAR_IMAGES[item.id - 1] : COFFEE_IMAGES[item.id - 1]}
                  style={styles.coffeeDateImages}
                  resizeMode="cover"
                />
              </View>
            </Pressable>
            <Text style={styles.coffeeDateText}>{item.name}</Text>
          </View>
        );
      });

    const handlePress = (id, isSanrioChar) => {
        setCoffeeDate(prev => ({ ...prev, [isSanrioChar ? "sanrioChar" : "coffee"]: id }))
        const updater = isSanrioChar ? setSanrioChar : setCoffeeDrink
        updater(prevList => prevList.map(prev => ({ ...prev, selected: prev.id === id ? !prev.selected : false})))
    };

    const renderCoffeeItem = useCallback(
        ({ item }) => (
          <CoffeeCharItem item={item} isSanrioChar={false} onPress={(id) => handlePress(id, false)} />
        ),
        [coffeeDrink]
      );
      
      const renderSanrioItem = useCallback(
        ({ item }) => (
          <CoffeeCharItem item={item} isSanrioChar={true} onPress={(id) => handlePress(id, true)} />
        ),
        [sanrioChar]
      );

      return (
        <View style={styles.listCoffeeAndCharContainer}>
            <View style={styles.coffeeDateContainer}>
                <Text style={styles.text}>Coffee:</Text>
                <FlatList
                    data={coffeeDrink}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderCoffeeItem}
                    alwaysBounceVertical
                />
            </View>
            <View style={styles.coffeeDateContainer}>
                <Text style={styles.text}>Date:</Text>
                <FlatList
                    data={sanrioChar}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderSanrioItem}
                    alwaysBounceVertical
                />
            </View>
        </View>
    )
}

export default memo(CoffeeAndCharScheduler);
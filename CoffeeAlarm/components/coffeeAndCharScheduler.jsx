import { View, Pressable, Text, FlatList } from "react-native";
import useStyles from "@/hooks/useStyles";
import { DateContext } from "@/context/DateContext"
import { SanrioCoffeeContext } from "@/context/SanrioAndCoffeeContext"
import { useContext, useCallback, memo } from "react";
import { COFFEE_IMAGES } from "@/constants/Coffees"
import { SANRIO_CHAR_IMAGES } from "@/constants/SanrioDates"
import FastImage from 'react-native-fast-image'

const CoffeeCharItem = memo(function CoffeeCharItem({ item, isSanrioChar, onPress }) {
  const styles = useStyles();
  return (
    <View style={styles.coffeeDateRow}>
      <Pressable onPress={() => onPress(item.id)} android_ripple={styles.coffeeCharRippling}>
        <View style={[styles.imageWrapper, item.selected && styles.selectedImageWrapper]}>
          <FastImage
            source={isSanrioChar ? SANRIO_CHAR_IMAGES[item.id - 1] : COFFEE_IMAGES[item.id - 1]}
            style={styles.coffeeDateImages}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </Pressable>
      <Text style={styles.coffeeDateText}>{item.name}</Text>
    </View>
  )
})


function CoffeeAndCharScheduler() {
    const { setCoffeeDate } = useContext(DateContext) // change this context into their individual context
    const { sanrioChar, setSanrioChar, coffeeDrink, setCoffeeDrink } = useContext(SanrioCoffeeContext)
    const styles = useStyles();


    const handlePress = useCallback((id, isSanrioChar) => {
      setCoffeeDate(prev => ({ ...prev, [isSanrioChar ? "sanrioChar" : "coffee"]: id }))
      const updater = isSanrioChar ? setSanrioChar : setCoffeeDrink
      updater(prevList => prevList.map(prev => ({...prev,selected: prev.id === id ? !prev.selected : false})))
    }, [setCoffeeDate, setSanrioChar, setCoffeeDrink])

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
                    removeClippedSubviews={true}
                    initialNumToRender={4}
                    maxToRenderPerBatch={4}
                    windowSize={15}
                    updateCellsBatchingPeriod={30}
                    getItemLayout={(data, index) => ({ length: 130, offset: 130 * index, index })}
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
                    removeClippedSubviews={true}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    windowSize={15}
                    updateCellsBatchingPeriod={30}
                    getItemLayout={(data, index) => ({ length: 130, offset: 130 * index, index })}
                />
            </View>
        </View>
    )
}

export default memo(CoffeeAndCharScheduler);
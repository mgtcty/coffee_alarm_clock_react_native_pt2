import { Children, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DateContext = createContext({})

export const DateProvider = ({ children }) => {
    const [ highestCoffeeId, setCoffeeId ] = useState(null)
    const [ coffeeDates, setCoffeeDates ] = useState([])
    const sortDates = (cDates) => cDates.sort((a, b) => b.id - a.id)

    // retrieve all coffee dates from local device
    useEffect(() => {
        const fetchCoffeeDates = async () => {
            try {
                // fetch local coffee dates
                const jsonCoffeeDates = await AsyncStorage.getItem("coffeeDates")

                // parse if not null
                const coffeeDs = jsonCoffeeDates ? sortDates(JSON.parse(jsonCoffeeDates)) : []
                
                // check if there is a list of coffee dates
                if (coffeeDs && coffeeDs.length) {
                    setCoffeeId(coffeeDs[0].id) // get the highest id
                    setCoffeeDates(coffeeDs)    // store all coffee date
                }
            } catch (e) {
                console.error("Error fetching coffee dates:", e);
            }
        }
        fetchCoffeeDates()
    },[])

    return(
        <DateContext.Provider value={{ highestCoffeeId, setCoffeeId, coffeeDates, setCoffeeDates }}>
            {children}
        </DateContext.Provider>
    )
}
  
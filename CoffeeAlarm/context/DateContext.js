import { Children, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DateContext = createContext({})

export const DateProvider = ({ children }) => {
    const [ highestCoffeeId, setCoffeeId ] = useState(null)
    const [ coffeeDates, setCoffeeDates ] = useState([])
    const [ coffeeDate, setCoffeeDate ] = useState(null);
    const [ nearestDate, setNearestDate ] = useState(null)
    const sortDates = (cDates) => cDates.sort((a, b) => b.id - a.id)

    // retrieve all coffee dates from local device
    useEffect(() => {
        const fetchCoffeeDates = async () => {
            try {
                // fetch local coffee dates
                const jsonCoffeeDates = await AsyncStorage.getItem("coffeeDates")

                // parse if not null
                const coffeeDs = jsonCoffeeDates ? sortDates(JSON.parse(jsonCoffeeDates)) : []
                
                // check if there is a list of coffee dates else default to zero
                if (coffeeDs && coffeeDs.length) {
                    setCoffeeId(coffeeDs[0].id) // get the highest id
                    setCoffeeDates(coffeeDs)    // store all coffee date
                } else {
                    setCoffeeId(0)
                    setCoffeeDates([])
                }
            } catch (e) {
                console.error("Error fetching coffee dates:", e);
            }
        }
        fetchCoffeeDates()
    },[])

    // Set coffee date according to the found id, else default to null all values
    useEffect(() => {
        if (highestCoffeeId !== null) {
            // find the coffee date of the highest id and store it in "coffeeDate"
            const found = coffeeDates.find(date => date.id.toString() === highestCoffeeId.toString());
            setCoffeeDate(
                found || {
                id: parseInt(highestCoffeeId),
                day: null,
                hour: null,
                minute: null,
                ampm: null,
                coffee: null,
                sanrioChar: null,
                }
            );
        }
    }, [highestCoffeeId, coffeeDates]);

    const hasDates = coffeeDates && coffeeDates.length;

    return(
        <DateContext.Provider value={{
            nearestDate, setNearestDate,
            coffeeDate, setCoffeeDate,
            highestCoffeeId, setCoffeeId, 
            coffeeDates, setCoffeeDates }}>
            {children}
        </DateContext.Provider>
    )
}
  
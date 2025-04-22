import { Children, createContext, useState } from "react";
import { COFFEE_ITEMS } from "@/constants/Coffees"
import { SANRIO_CHAR_ITEMS } from "@/constants/SanrioDates"

export const SanrioCoffeeContext = createContext({})

export const  SanrioCoffeeProvider = ({ children }) => {
    const [ sanrioChar, setSanrioChar ] = useState(SANRIO_CHAR_ITEMS)
    const [ coffeeDrink, setCoffeeDrink ] = useState(COFFEE_ITEMS)

    return (<SanrioCoffeeContext.Provider value={{sanrioChar, setSanrioChar, coffeeDrink, setCoffeeDrink,}}>
        {children}
    </SanrioCoffeeContext.Provider>)
}
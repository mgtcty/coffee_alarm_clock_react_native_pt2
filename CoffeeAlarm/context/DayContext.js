import { Children, createContext, useState, useReducer } from "react";

export const DayContext = createContext({})

export const defaultDays = [
    { name: "S", id: 0, set: true },
    { name: "M", id: 1, set: false },
    { name: "T", id: 2, set: false },
    { name: "W", id: 3, set: false },
    { name: "T", id: 4, set: false },
    { name: "F", id: 5, set: false },
    { name: "S", id: 6, set: false }
  ];

export const  DayProvider = ({ children }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "TOGGLE_DAY":
                return state.map(day => day.id === action.payload ? 
                    { ...day, set: !day.selected } : {...day, set: false})
            case "RESET":
                return action.payload
            default:
                return state
        }
    }
    
    const [ isAdding, setIsAdding ] = useState(false)
    const [ days, dispatch ] = useReducer(reducer, defaultDays)

    return (<DayContext.Provider value={{isAdding, setIsAdding, days, dispatch }}>
        {children}
    </DayContext.Provider>)
}
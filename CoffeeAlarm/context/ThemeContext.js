import { Children, createContext, useState} from 'react'
import { Appearance } from 'react-native'
import { Colors } from '../constants/Colors'

export const ThemeContext = createContext({})

/**
 * This constant changes the theme of the application
 * @param {*} children - special props that allows a component to wrap and display nested elements inside it
 * @returns ThemeContext - the light or dark theme of an app based from the Color scheme
 */
export const ThemeProvider = ({children}) => {
    // variable colorScheme can change overtime through using setColorScheme()
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

    // changes the default theme variables whenever the colorscheme changes
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light

    // Function to toggle theme
    const toggleTheme = () => {
        setColorScheme(prevScheme => (prevScheme === 'dark' ? 'light' : 'dark'))
    }

    return(
        <ThemeContext.Provider value={{colorScheme, setColorScheme, theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
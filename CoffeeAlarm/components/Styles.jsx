import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";


export default function Styles() {
    const {colorScheme, setColorScheme, theme} = useContext(ThemeContext)

    return StyleSheet.create({
        //container components
        container:{
          flex:1,
          justifyContent:'flex-end',
          width: '100%',
          backgroundColor:theme.background
        },

        // text components
        text:{
            color:theme.text
        },
        
        // footer components
        footer:{
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: 10,
            gap: '10%',
        },
        footerIcons:{
            padding: 10,
            color: theme.icon,
        },

        // theme and alarm scheduling component
        alarmIcons:{
            color: theme.icon,
        },
        seperator:{
            height:1,
            backgroundColor:theme.seperator,
            width: '85%',
            maxWidth: 375,
            marginHorizontal: 'auto',
        },
        controlPanel:{
            flexDirection:'row',
            padding:5,
            paddingHorizontal:'9%',
            gap:'5%',
            justifyContent:'flex-end'

        },

        // dateId page components
        middleSettingContainer:{
            flexDirection:'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        coffeeDateContainer:{
            alignItems: 'center',
        },
        daysContainer: {
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '1%',
        },
        dayText:{
            fontSize: 24,
            color:theme.text,
        },
        selectedDayText: {
            color:theme.seperator,
        },
        day: {
            width: '80%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        dayButton: {
            padding: '5%',
            paddingBottom: '10%',
        },
    })
}
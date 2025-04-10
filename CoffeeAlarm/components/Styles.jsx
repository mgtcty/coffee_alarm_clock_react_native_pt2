import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";


export default function Styles() {
    const {colorScheme, setColorScheme, theme} = useContext(ThemeContext)

    return StyleSheet.create({
        //container components
        container:{
          flex:1,
          flexDirection: 'column',
          justifyContent:'flex-end',
          width: '100%',
          alignItems: 'stretch',
          backgroundColor:theme.background
        },
        UpperSettingContainer:{
            paddingTop: "2%",
            flex: 3.5,
            alignItems: 'center',
        },
        middleSettingContainer:{
            flex: 5.5,
            alignItems: 'center',
        },
        BottomSettingContainer:{
            flex: 1,
            flexDirection:'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
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
            alignSelf: 'center',
            marginVertical: 10,
        },
        controlPanel:{
            flexDirection:'row',
            padding:5,
            paddingHorizontal:'9%',
            gap:'5%',
            justifyContent:'flex-end'

        },

        // dateId page components
        coffeeDateContainer:{
            alignItems: 'center',
        },

        // dayscheduler components
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
        dayContainer: {
            width: '80%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            right:-15
        },
        dayButton: {
            padding: '5%',
            paddingBottom: '10%',
        },

        // coffeedatescheduler components
        coffeeDateImages: {
            width: 100,
            height: 100,
            borderRadius: 10,
        },
        imageWrapper:{
            padding: 5,
            borderRadius: 15,
        },
        selectedImageWrapper: {
            backgroundColor: theme.highlightedImage,
        },
        coffeeDateContainer:{
            alignItems:'center',
            flexDirection: 'column',
            paddingVertical:10,
            paddingHorizontal:12,
        },
        coffeeDateText: {
            color:theme.text,
            fontSize: 15,
        },
        coffeeDateRow: {
            alignItems: 'center',
        },
        listCoffeeAndCharContainer:{
            alignContent:'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        },

        // time scheduling components
        timePicker: {
            alignItems: 'center',
            backgroundColor:theme.background,
            pickerContainer:{
                left: 15,
            },
            pickerItem: {
                fontSize: 68,
            },
            pickerLabel: {
                fontSize: 30,
                right: -30,
            },
            pickerLabelContainer: {
                width: 60,
            },
            pickerItemContainer: {
                width: 150,
                height: 75,
            },
        },
    })
}
import { Text, View, Appearance, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from "@/components/Styles";


/**
 * Function that returns the footer component including its functionality and style
 * @param {*} pageName - a string containing the name directory of a specific stack
 * @returns a footer component
 */
export default function Footer({ pageName }) {
    const styles = Styles()

    // creates a button with a link if not on that page
    const createButton = (href, IconComponent, iconName) => {
        const iconButton = (
            <Pressable>
                <IconComponent name={iconName} size={36} style={styles.footerIcons}/>
            </Pressable>
        );
        // returns a button only if its already on that page, else includes a link
        return pageName != href ? <Link href={href} asChild>{iconButton}</Link>: iconButton;
    }

    return (
        <View style={styles.footer}>
            {createButton("/", Feather, "coffee")}
            {createButton("/schedule", MaterialCommunityIcons, "coffee-maker-outline")}
        </View>
    );
}
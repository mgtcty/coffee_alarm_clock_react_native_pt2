import { Text, View, Appearance, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Footer from "@/components/footer";
import Styles from "@/components/Styles";
import ThemeAndAlarmScheduling from "@/components/themeAndAlarmControls";

export default function Index() {
  const styles = Styles();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>
          Dwink!
        </Text>
      </View>
      <ThemeAndAlarmScheduling/>
      <View>
        <Text style={styles.text}>
          button clicking area
        </Text>
      </View>
      <Footer pageName="/index"/>
    </SafeAreaView>
  );
}

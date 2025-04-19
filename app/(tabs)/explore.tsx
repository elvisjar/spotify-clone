import { StyleSheet, View } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { Colors } from "@/constants/Colors"

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>Coming soon...</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: 700,
  },
})

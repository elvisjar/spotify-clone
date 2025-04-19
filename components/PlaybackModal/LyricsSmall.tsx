import { StyleSheet, View, Pressable } from "react-native"
import { ThemedText } from "../ThemedText"

interface LyricsSmallProps {
  openLyricsModal?: (songId: string) => void
}

export function LyricsSmall(_: LyricsSmallProps) {
  return (
    <Pressable style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Coming soon...</ThemedText>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: "100%",
    height: 250,
    backgroundColor: "#5A8F77",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
  },
})

import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { Colors } from "@/constants/Colors"
import { ThemedText } from "../ThemedText"
import { IconSymbol } from "../ui/IconSymbol"

interface HeaderProps {
  close: () => void
  openOptions: () => void
  topText: string
  bottomText: string
}

export const Header = ({ close, bottomText, topText, openOptions }: HeaderProps) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={close}>
      <IconSymbol name="chevron.down" color={Colors.dark.tint} size={Platform.OS === "ios" ? 28 : 36} />
    </TouchableOpacity>
    <View style={styles.headerMid}>
      <ThemedText style={styles.headerTopText}>{topText}</ThemedText>
      <ThemedText style={styles.headerBottomText}>{bottomText}</ThemedText>
    </View>
    <TouchableOpacity
      onPress={() => {
        openOptions()
      }}
    >
      <IconSymbol name="ellipsis" color={Colors.dark.tint} size={26} />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 2,
    flexDirection: "row",
    paddingTop: Platform.OS === "ios" ? 5 : 10,
    alignItems: "center",
  },
  headerMid: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTopText: { fontSize: 14 },
  headerBottomText: { fontSize: 18, fontWeight: 600 },
})

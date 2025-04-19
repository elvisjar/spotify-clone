import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Colors } from "@/constants/Colors"

export function TabBarBackground() {
  return (
    <LinearGradient
      style={[StyleSheet.absoluteFill, styles.content]}
      colors={[Colors.dark.background, "transparent"]}
      locations={[0.2, 1]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    />
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
})

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight()
  const { bottom } = useSafeAreaInsets()
  return tabHeight - bottom
}

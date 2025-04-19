import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"

const { width } = Dimensions.get("window")

const Skeleton = ({
  height = 20,
  borderRadius = 4,
  darkMode = false,
}: {
  height?: number
  borderRadius?: number
  darkMode?: boolean
}) => {
  const translateX = useSharedValue(-width * 2)
  React.useEffect(() => {
    translateX.value = withRepeat(withTiming(width, { duration: 1500 }), -1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const backgroundColor = darkMode ? "#2D2D2D" : "#E0E0E0"
  const highlightColor = darkMode ? "#3E3E3E" : "#F5F5F5"

  return (
    <View style={[styles.container, { height, borderRadius, backgroundColor }]}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={[backgroundColor, highlightColor, backgroundColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: "100%",
  },
})

export default Skeleton

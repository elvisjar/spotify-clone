import { forwardRef } from "react"
import { Text, type TextProps, StyleSheet } from "react-native"
import Animated from "react-native-reanimated"
import { Colors } from "@/constants/Colors"

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link"
}

export const ThemedText = forwardRef<Text, ThemedTextProps>(({ style, type = "default", ...rest }, ref) => {
  return (
    <Text
      ref={ref}
      style={[
        { color: Colors.dark.tint },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  )
})

ThemedText.displayName = "ThemedText"

export const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText)

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
})

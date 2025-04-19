import { BlurView } from "expo-blur"
import { ActivityIndicator, StyleSheet } from "react-native"

const BackgroundLoading = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null

  return (
    <BlurView style={[StyleSheet.absoluteFill, styles.background]} tint="dark">
      <ActivityIndicator size={"large"} />
    </BlurView>
  )
}

export default BackgroundLoading

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
})

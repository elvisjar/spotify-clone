import { memo, useMemo, useState } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import Animated, {
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import { Colors } from "@/constants/Colors"
import { usePlayback } from "../PlaybackStore"
import { ThemedText } from "../ThemedText"

interface ProgressBarType {
  containerStyle?: StyleProp<ViewStyle>
  onBigScreen?: boolean
}

const formatTime = (ms: number = 0) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function ProgressBarComponent({ containerStyle, onBigScreen = true }: ProgressBarType) {
  const playbackStore = usePlayback()
  const seekPosition = useSharedValue(0)
  const [barWidth, setBarWidth] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const songDurationFormatted = useMemo(() => formatTime(playbackStore.songDuration), [playbackStore.songDuration])
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState(() => formatTime(playbackStore.currentTime.value))

  function updateCurrentTimeFormatted(ms: number = 0) {
    setCurrentTimeFormatted(formatTime(ms))
  }

  useAnimatedReaction(
    () => (isSeeking ? seekPosition.value : playbackStore.currentTime.value),
    current => {
      runOnJS(updateCurrentTimeFormatted)(current)
    },
  )

  const fillAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(playbackStore.currentTime.value, [0, playbackStore.songDuration], [0, 1]) * 100}%`,
    }
  })

  const seekAnimatedStyle = useAnimatedStyle(() => ({
    width: `${interpolate(seekPosition.value, [0, playbackStore.songDuration], [0, 1]) * 100}%`,
  }))

  const seekGesture = Gesture.Pan()
    .enabled(onBigScreen)
    .activateAfterLongPress(200)
    .onBegin(() => {
      runOnJS(setIsSeeking)(true)
      cancelAnimation(playbackStore.currentTime)
    })
    .onUpdate(event => {
      seekPosition.value = interpolate(event.x, [0, barWidth], [0, playbackStore.songDuration])
    })
    .onEnd(() => {
      playbackStore.seek(seekPosition.value)
      runOnJS(setIsSeeking)(false)
    })

  return (
    <View>
      <GestureDetector gesture={seekGesture}>
        <View style={{ width: "100%" }}>
          <Animated.View
            style={[styles.background, containerStyle]}
            onLayout={e => {
              setBarWidth(e.nativeEvent.layout.width)
            }}
          >
            <Animated.View style={[styles.fill, isSeeking ? seekAnimatedStyle : fillAnimatedStyle]} />
          </Animated.View>
          {onBigScreen && (
            <View style={[styles.seekTrackerContainer]}>
              <Animated.View style={[isSeeking ? seekAnimatedStyle : fillAnimatedStyle]} />
              <Animated.View style={styles.seekTracker} />
            </View>
          )}
        </View>
      </GestureDetector>
      {onBigScreen && (
        <View style={styles.progressBarTextContainer}>
          <ThemedText style={styles.timers}>{currentTimeFormatted}</ThemedText>
          <ThemedText style={styles.timers}>{songDurationFormatted}</ThemedText>
        </View>
      )}
    </View>
  )
}

export const ProgressBar = memo(ProgressBarComponent)

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.dark.icon,
    width: "100%",
    height: 3,
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 3,
  },
  fill: {
    backgroundColor: Colors.dark.tint,
    height: "100%",
    width: "0%",
  },
  seekTrackerContainer: {
    position: "absolute",
    width: "100%",
    height: 10,
    zIndex: 2,
    top: 0,
    flexDirection: "row",
  },
  seekTracker: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 50,
    height: 10,
    width: 10,
    transform: [{ translateX: -5 }],
  },
  progressBarTextContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 1,
  },
  timers: {
    fontSize: 15,
  },
})

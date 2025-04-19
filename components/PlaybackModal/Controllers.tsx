import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Colors } from "@/constants/Colors"
import { usePlayback } from "../PlaybackStore"
import { IconSymbol } from "../ui/IconSymbol"
import { ProgressBar } from "../ui/ProgessBar"

const ICON_SIZE = 30
const ICON_CENTER = 75
const SPOTIFY_GREEN = "#1DB954"

export const Controllers = () => {
  const playbackStore = usePlayback()

  return (
    <View>
      <View style={styles.progressBarContainer}>
        <ProgressBar containerStyle={styles.progressBar} />
      </View>
      <View style={styles.btnContainers}>
        <TouchableOpacity onPress={playbackStore.toggleShuffle} activeOpacity={0.8}>
          <IconSymbol
            size={ICON_SIZE}
            name="shuffle"
            color={playbackStore.onShuffle ? SPOTIFY_GREEN : Colors.dark.tint}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconSymbol size={ICON_SIZE} name="backward.fill" color={Colors.dark.tint} />
        </TouchableOpacity>
        <TouchableOpacity onPress={playbackStore.isPlaying ? playbackStore.pause : playbackStore.play}>
          <IconSymbol
            size={ICON_CENTER}
            name={playbackStore.isPlaying ? "pause.circle.fill" : "play.circle.fill"}
            color={Colors.dark.tint}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconSymbol size={ICON_SIZE} name="forward.fill" color={Colors.dark.tint} />
        </TouchableOpacity>
        <TouchableOpacity onPress={playbackStore.toggleRepeat} activeOpacity={0.8}>
          <IconSymbol
            size={ICON_SIZE}
            name="repeat"
            color={playbackStore.onRepeat ? SPOTIFY_GREEN : Colors.dark.tint}
          />
          {playbackStore.onRepeat && <View style={styles.onRepeatIndicator} />}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  progressBarContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 4.5,
  },
  onRepeatIndicator: {
    position: "absolute",
    bottom: -6,
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: SPOTIFY_GREEN,
    alignSelf: "center",
  },
})

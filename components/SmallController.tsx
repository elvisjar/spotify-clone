import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { List } from "react-native-paper"
import Animated from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Colors } from "@/constants/Colors"
import { usePlayback } from "./PlaybackStore"
import { IconSymbol } from "./ui/IconSymbol"
import { ProgressBar } from "./ui/ProgessBar"

interface SmallControllerProps {
  presentPlayback: () => void
}

function SongImage() {
  return <Image style={styles.songImage} source={require("@/assets/images/justice-justice-cover.jpeg")} />
}

export function SmallController(props: SmallControllerProps) {
  const playbackStore = usePlayback()
  const { bottom } = useSafeAreaInsets()

  return (
    <Animated.View style={[styles.container, { marginBottom: bottom }]}>
      <View style={styles.content}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.9} onPress={props.presentPlayback}>
          <List.Item
            left={SongImage}
            title="Ghost"
            description="Justin Bieber"
            titleStyle={styles.title}
            descriptionStyle={styles.desc}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconSymbol size={30} name="plus.circle" color={Colors.dark.tint} />
        </TouchableOpacity>
        <TouchableOpacity onPress={playbackStore.isPlaying ? playbackStore.pause : playbackStore.play}>
          <IconSymbol size={30} name={playbackStore.isPlaying ? "pause.fill" : "play.fill"} color={Colors.dark.tint} />
        </TouchableOpacity>
      </View>
      <ProgressBar onBigScreen={false} containerStyle={styles.songProgress} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60,
    left: 15,
    right: 15,
    height: 68,
    backgroundColor: "#1a9690",
    borderRadius: 5,
    justifyContent: "center",
    padding: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    gap: 12,
  },
  title: {
    color: Colors.dark.tint,
    fontWeight: "700",
  },
  desc: {
    color: Colors.dark.text,
    fontWeight: "600",
  },
  songImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 5,
  },
  songProgress: {
    position: "absolute",
    bottom: -8,
    marginVertical: 0,
    alignSelf: "center",
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
})

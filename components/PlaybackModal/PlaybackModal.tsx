import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { StatusBar } from "expo-status-bar"
import { useVideoPlayer, VideoView } from "expo-video"
import React, { forwardRef, useRef, useState } from "react"
import { StyleSheet, TouchableOpacity, View, Image, Dimensions } from "react-native"
import { List } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Colors } from "@/constants/Colors"
import { Controllers } from "./Controllers"
import { Header } from "./Header"
import { ThemedText } from "../ThemedText"
import { LyricsSmall } from "./LyricsSmall"
import { SheetOptions, SheetOptionsMethods } from "./SheetOptions"
import { IconSymbol } from "../ui/IconSymbol"
const videoBackground = require("@/assets/videos/bieber.mp4")

interface PlaybackModalProps {
  close: () => void
  openOptions?: () => void
}

function SongImage() {
  return <Image style={styles.songImage} source={require("@/assets/images/justice-justice-cover.jpeg")} />
}

export const PlaybackScreen = ({ close, openOptions }: PlaybackModalProps) => {
  const [liked, setLiked] = useState(false)

  const insets = useSafeAreaInsets()
  const videoPlayer = useVideoPlayer(videoBackground, player => {
    player.loop = true
    player.muted = true
    player.play()
  })

  return (
    <BottomSheetScrollView style={[styles.container]} overScrollMode={"never"}>
      <StatusBar style="light" animated />
      <VideoView
        player={videoPlayer}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        style={styles.video}
        allowsVideoFrameAnalysis={false}
        contentFit="cover"
      />
      <View style={styles.videoMask} />
      <View style={[styles.firstContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Header
          close={close}
          topText="PLAYING FROM Justin Bieber"
          bottomText="Justin Bieber's Radio"
          openOptions={openOptions ? openOptions : () => {}}
        />
        <View style={{ flex: 1 }} />
        <View style={styles.playbackControllerContainer}>
          <View style={styles.content}>
            <List.Item
              left={SongImage}
              title="Ghost"
              style={{ flex: 1 }}
              description="Justin Bieber"
              titleStyle={styles.title}
              descriptionStyle={styles.desc}
            />
            <TouchableOpacity>
              <IconSymbol size={38} name="minus.circle" color={Colors.dark.tint} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              <IconSymbol
                size={38}
                name={liked ? "checkmark.circle.fill" : "plus.circle"}
                color={liked ? Colors.SPOTIFY_GREEN : Colors.dark.tint}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Controllers />
        <View style={styles.innerShadow} />
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.nearEventsContainer}>
          <ThemedText style={styles.nearEventsTitle}>Live events near you</ThemedText>
          <View style={styles.nearEventsImageContainer}>
            <Image
              resizeMode="cover"
              style={styles.nearEventsImage}
              source={require("@/assets/images/j-events.jpeg")}
            />
          </View>
          <View style={styles.nearEventsFooter}>
            <View>
              <ThemedText style={{ fontSize: 20, fontWeight: 700, marginBottom: 3 }}>Justin Bieber</ThemedText>
              <ThemedText style={{ fontSize: 15, lineHeight: 19 }}>5 may - 27 Sept</ThemedText>
              <ThemedText style={{ fontSize: 15, lineHeight: 19, color: Colors.dark.tabIconDefault }}>
                5 events
              </ThemedText>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
              <TouchableOpacity style={styles.nearEventsBtn}>
                <ThemedText style={{ fontSize: 14, fontWeight: 700, lineHeight: 18 }}>Search tickets</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <LyricsSmall />
      </View>
    </BottomSheetScrollView>
  )
}

export const PlaybackModal = forwardRef<BottomSheetModal, PlaybackModalProps>(({ close }, ref) => {
  const sheetOptionsRef = useRef<SheetOptionsMethods>(null)
  return (
    <BottomSheetModal
      key="Playbackmodal"
      name="Playbackmodal"
      backgroundStyle={{ backgroundColor: Colors.dark.background }}
      snapPoints={["100%"]}
      index={0}
      ref={ref}
      handleComponent={null}
      enableOverDrag={false}
      backdropComponent={null}
    >
      <PlaybackScreen close={close} openOptions={() => sheetOptionsRef.current?.open()} />
      <SheetOptions ref={sheetOptionsRef} />
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  coverImage: {
    width: "100%",
    height: 350,
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 50,
    marginBottom: 50,
  },
  video: {
    position: "absolute",
    top: 0,
    flex: 1,
    height: Dimensions.get("window").height,
    width: "100%",
    zIndex: 1,
  },
  videoMask: {
    position: "absolute",
    top: 0,
    flex: 1,
    height: Dimensions.get("window").height,
    width: "100%",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  playbackBackground: {
    height: Dimensions.get("window").height,
    width: "100%",
  },
  firstContainer: {
    paddingHorizontal: 25,
    zIndex: 2,
    position: "relative",
    overflow: "hidden",
    height: Dimensions.get("window").height,
  },
  innerShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10, // Android shadow
    zIndex: 1,
  },
  songImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 5,
  },
  title: {
    color: Colors.dark.tint,
    fontWeight: "700",
    fontSize: 20,
  },
  desc: {
    color: Colors.dark.text,
    fontWeight: "600",
    fontSize: 16,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  playbackControllerContainer: {},
  secondContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    gap: 30,
  },
  nearEventsContainer: {
    marginTop: 25,
    borderRadius: 15,
    backgroundColor: Colors.dark.card,
  },
  nearEventsTitle: {
    fontWeight: 700,
    fontSize: 20,
    position: "absolute",
    left: 20,
    top: 20,
    zIndex: 3,
  },
  nearEventsImageContainer: {
    height: 200,
    width: "100%",
  },
  nearEventsImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  nearEventsFooter: {
    flexDirection: "row",
    backgroundColor: "transparent",
    padding: 20,
  },
  nearEventsBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark.tint,
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 50,
    justifyContent: "center",
  },
})

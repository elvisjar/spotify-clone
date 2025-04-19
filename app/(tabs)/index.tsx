import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { Image, LayoutChangeEvent, Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  interpolateColor,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground"
import { Colors } from "@/constants/Colors"
import { ArtistMoreOptions } from "@/pages/artist-details/ArtistMoreOptions"
import { MostLikedList } from "@/pages/artist-details/MostLikedList"
import { PopularReleases } from "@/pages/artist-details/PopularReleases"
import { PopularSongs } from "@/pages/artist-details/PopularSongs"
import { spotifyApi } from "@/utils/spotifyApi"
import { Song } from "@/utils/types"

const HEADER_HEIGHT = 250
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedText = Animated.createAnimatedComponent(ThemedText)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformSongsData({ data }: any): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.tracks.map((track: any) => ({
    title: track.name,
    imageUri: track.uri,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    artist: track.artists.map((artist: { name: any }) => artist.name).join(" • "),
    reproductions: `${Math.floor(Math.random() * 4000000 + 1000000).toLocaleString("en-US")} plays`,
    duration: "123",
    id: track.id,
  }))
}

export default function HomeScreen() {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [playBtnPositionY, setPlayBtnPositionY] = useState(0)
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const bottom = useBottomTabOverflow()
  const insets = useSafeAreaInsets()
  const { data: songs, isFetching: songsLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: () => spotifyApi.get(`/artists/${"1uNFoZAHBGtllmzznpCI3s"}/top-tracks`),
    // queryFn: () => [],
    select: transformSongsData,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })
  const modalSheet = useRef<BottomSheetModal>(null)

  function handleHeaderLayout(e: LayoutChangeEvent) {
    const height = e.nativeEvent.layout.height
    if (height !== headerHeight) {
      setHeaderHeight(height)
    }
  }

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1.1, 1]),
        },
      ],
      opacity: interpolate(scrollOffset.value, [0, HEADER_HEIGHT], [1, 0]),
    }
  })

  const headerTopAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollOffset.value,
        [HEADER_HEIGHT / 2, HEADER_HEIGHT],
        ["transparent", Colors.dark.background],
      ),
      transform: [
        {
          translateY: interpolate(scrollOffset.value, [-20, 0], [-20, 0], { extrapolateRight: "clamp" }),
        },
      ],
    }
  })

  const headerTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, HEADER_HEIGHT - 50], [0, 1]),
    }
  })

  const headerBackButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(scrollOffset.value, [0, HEADER_HEIGHT], ["rgba(0,0,0,0.4)", "transparent"]),
    }
  })

  const trackBtnAnimatedStyle = useAnimatedStyle(() => {
    // console.log(scrollOffset.value)
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, playBtnPositionY - headerHeight + 24],
            [HEADER_HEIGHT, 0, -playBtnPositionY + headerHeight - 24],
            { extrapolateRight: "clamp" },
          ),
        },
      ],
    }
  })

  return (
    <ThemedView style={styles.background}>
      <View style={styles.background}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          scrollIndicatorInsets={{ bottom }}
          contentContainerStyle={{ paddingBottom: bottom }}
        >
          <Animated.View style={[styles.headerCover, headerAnimatedStyle]}>
            <Image
              style={styles.headerImage}
              resizeMode="cover"
              source={{ uri: "https://i.scdn.co/image/ab676161000051748ae7f2aaa9817a704a87ea36" }}
            />
          </Animated.View>
          <ThemedView style={styles.content}>
            <View style={{ paddingHorizontal: 15 }}>
              <ThemedText style={styles.contentHeaderText} type="title">
                Justin Bieber
              </ThemedText>
              <ThemedText style={styles.listenerText}>80.7 M montly listeners</ThemedText>
              <View style={styles.followingnTrackContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity style={styles.followingBtn}>
                    <ThemedText type="defaultSemiBold" style={{ fontSize: 14 }}>
                      Following
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.moreBtn}
                    onPress={() => {
                      modalSheet.current?.present()
                    }}
                  >
                    <IconSymbol name="ellipsis" color={Colors.dark.tabIconSelected} />
                  </TouchableOpacity>
                </View>
                <View style={styles.trankContainer}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <IconSymbol name="shuffle" color={Colors.dark.icon} size={32} />
                  </TouchableOpacity>
                </View>
              </View>
              <MostLikedList />
            </View>
            <PopularSongs
              songs={songs as Song[]}
              loading={songsLoading}
              openSheet={() => modalSheet.current?.present()}
            />
            <PopularReleases />
          </ThemedView>
        </Animated.ScrollView>
      </View>
      <Animated.View
        onLayout={handleHeaderLayout}
        style={[styles.header, { paddingTop: insets.top }, headerTopAnimatedStyle]}
      >
        <AnimatedTouchableOpacity activeOpacity={0.8} style={[headerBackButtonAnimatedStyle, styles.headerBackButton]}>
          <IconSymbol name="arrow.left" color={Colors.dark.tint} size={24} style={styles.headerBackButtonIcon} />
        </AnimatedTouchableOpacity>
        <AnimatedText style={[headerTextAnimatedStyle]} type="subtitle">
          Justin Bieber
        </AnimatedText>
      </Animated.View>
      <AnimatedTouchableOpacity
        onLayout={e => {
          if (playBtnPositionY !== e.nativeEvent.layout.y) {
            setPlayBtnPositionY(e.nativeEvent.layout.y)
          }
        }}
        onPress={() => {}}
        activeOpacity={0.7}
        style={[styles.playBtn, trackBtnAnimatedStyle]}
      >
        <IconSymbol name="play.fill" color={Colors.primary.tint} />
      </AnimatedTouchableOpacity>
      <ArtistMoreOptions ref={modalSheet} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.dark.background,
    height: "100%",
    width: "100%",
  },
  content: { backgroundColor: Colors.dark.background },
  headerCover: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: 320,
  },
  header: {
    width: "100%",
    position: "absolute",
    top: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    alignItems: "center",
    minHeight: 80,
    paddingBottom: 15,
  },
  headerBackButton: {
    borderRadius: 50,
    padding: 10,
  },
  headerBackButtonIcon: {
    ...Platform.select({
      android: {
        transform: [{ translateX: 3.5 }],
      },
    }),
  },
  contentHeaderText: {
    fontSize: 50,
    lineHeight: 54,
    position: "absolute",
    top: -54,
    paddingHorizontal: 15,
  },
  listenerText: {
    color: Colors.dark.text,
    paddingTop: 15,
  },
  followingnTrackContainer: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  trankContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingRight: 65,
  },
  followingBtn: {
    borderWidth: 1,
    borderColor: Colors.dark.tint,
    borderRadius: 5,
    padding: 3,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  moreBtn: {},
  playBtn: {
    backgroundColor: Colors.primary.background,
    borderRadius: 50,
    padding: 12,
    position: "absolute",
    right: 15,
    top: 291,
    height: 48,
    // zIndex: 1,
  },
})

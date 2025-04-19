import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { List } from "react-native-paper"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import Skeleton from "@/components/Skeleton"
import { AnimatedThemedText, ThemedText } from "@/components/ThemedText"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { Colors } from "@/constants/Colors"
import { getRandomImage } from "@/utils/funcs"
import { Song } from "@/utils/types"

function LeftContent(props: { uri: string; index: number }) {
  return (
    <View style={styles.listLeftContainer}>
      <ThemedText style={styles.listLeftText}>{props.index}</ThemedText>
      <Image source={getRandomImage()} style={styles.avatar} resizeMode="cover" />
    </View>
  )
}

function RightContent({ openSheet }: { openSheet: () => void }) {
  return (
    <TouchableOpacity style={styles.ellipsis} onPress={openSheet}>
      <IconSymbol name="ellipsis" color={Colors.dark.icon} size={20} />
    </TouchableOpacity>
  )
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

type PopularSongsType = {
  songs: Song[]
  loading: boolean
  openSheet: () => void
}

export function PopularSongs({ songs = [], openSheet }: PopularSongsType) {
  const [expand, setExpand] = useState(false)
  const expandSV = useSharedValue(0)

  useEffect(() => {
    expandSV.value = withTiming(expand ? 1 : 0, { duration: 500 })
  }, [expand])

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: interpolate(expandSV.value, [0, 1], [500, 820]),
  }))

  const blurAnimated = useAnimatedStyle(() => ({
    height: interpolate(expandSV.value, [0, 1], [60, 0]),
  }))

  return (
    <View>
      <Animated.View style={[{ overflow: "hidden" }, animatedContainerStyle]}>
        <View style={{ paddingHorizontal: 15 }}>
          <ThemedText style={styles.title} type="title">
            Popular Songs
          </ThemedText>
          {songs.length === 0 && (
            <View style={{ gap: 10, marginTop: 20 }}>
              <Skeleton height={60} darkMode />
              <Skeleton height={60} darkMode />
            </View>
          )}

          {songs.map((song, i) => (
            <List.Item
              key={song.id}
              title={song.title}
              description={song.reproductions}
              style={{ paddingRight: 10 }}
              titleStyle={{ color: Colors.dark.text }}
              descriptionStyle={{ color: Colors.dark.icon, paddingTop: 2 }}
              left={() => LeftContent({ uri: song.imageUri, index: i + 1 })}
              right={() => RightContent({ openSheet })}
            />
          ))}
        </View>
        <AnimatedLinearGradient
          style={[styles.bottomBlur, blurAnimated]}
          colors={[Colors.dark.background, "transparent"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
      </Animated.View>
      <TouchableOpacity style={styles.seeMoreBtn} onPress={() => setExpand(!expand)} activeOpacity={0.7}>
        <AnimatedThemedText type="defaultSemiBold">See {expand ? "less" : "more"}</AnimatedThemedText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 24,
    marginTop: 4,
  },
  avatar: {
    borderRadius: 3,
    width: 52,
    height: 52,
  },
  listLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listLeftText: {
    paddingHorizontal: 10,
    paddingRight: 25,
  },
  ellipsis: {
    alignSelf: "center",
  },
  seeMoreBtn: {
    padding: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
    tintColor: Colors.dark.tint,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 20,
  },
  bottomBlur: { position: "absolute", bottom: 0, left: 0, zIndex: 1, width: "100%" },
})

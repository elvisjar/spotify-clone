import { Image, View, StyleSheet, ImageSourcePropType } from "react-native"
import { List } from "react-native-paper"

import Journals from "@/assets/images/journals.jpeg"
import JusticeJusticeCover from "@/assets/images/justice-justice-cover.jpeg"
import Purpose from "@/assets/images/purpose.jpeg"
import { ThemedText } from "@/components/ThemedText"
import { Colors } from "@/constants/Colors"

function LeftContent(props: { uri: ImageSourcePropType | undefined }) {
  return (
    <View>
      <Image source={props.uri} style={styles.albumImage} />
    </View>
  )
}

export function PopularReleases() {
  return (
    <View style={styles.content}>
      <ThemedText style={styles.title} type="title">
        Popular Songs
      </ThemedText>
      <List.Item
        title="Justice"
        titleStyle={styles.titleItem}
        description="2021 • Album"
        descriptionStyle={{ color: Colors.dark.icon }}
        left={() => LeftContent({ uri: JusticeJusticeCover })}
      />
      <List.Item
        title="Purpose"
        titleStyle={styles.titleItem}
        description="2015 • Album"
        descriptionStyle={{ color: Colors.dark.icon }}
        left={() => LeftContent({ uri: Purpose })}
      />
      <List.Item
        title="Journals"
        titleStyle={styles.titleItem}
        description="2014 • Album"
        descriptionStyle={{ color: Colors.dark.icon }}
        left={() => LeftContent({ uri: Journals })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  albumImage: { borderRadius: 3, resizeMode: "cover", width: 90, height: 90 },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 10,
  },
  titleItem: {
    fontSize: 18,
    color: Colors.dark.tint,
    marginBottom: 5,
  },
})

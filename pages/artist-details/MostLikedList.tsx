import { View, StyleSheet } from "react-native"
import { Avatar, List } from "react-native-paper"

import { IconSymbol } from "@/components/ui/IconSymbol"
import { Colors } from "@/constants/Colors"

const LeftContent = () => (
  <Avatar.Image size={56} source={{ uri: "https://i.scdn.co/image/ab676161000051748ae7f2aaa9817a704a87ea36" }} />
)

const RightContent = () => {
  return <IconSymbol name="chevron.forward" color={Colors.dark.icon} size={20} style={{ alignSelf: "center" }} />
}

export function MostLikedList() {
  return (
    <View>
      <List.Item
        title="Most liked"
        description="6 songs • 1 release • Justin Bieber"
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        left={LeftContent}
        right={RightContent}
        style={{ paddingRight: 10 }}
        onPress={() => {}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.dark.tint,
  },
  description: {
    color: Colors.dark.icon,
    paddingTop: 5,
  },
})

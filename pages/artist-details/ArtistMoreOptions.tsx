import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { SymbolViewProps } from "expo-symbols"
import { forwardRef } from "react"
import { StyleSheet, View } from "react-native"
import { Avatar, List } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { Colors } from "@/constants/Colors"

type OptionsType = {
  title: string
  icon: SymbolViewProps["name"]
}

const OPTIONS: OptionsType[] = [
  {
    title: "Stop following",
    icon: "xmark",
  },
  {
    title: "No reproduce this artist",
    icon: "minus.circle",
  },
  {
    title: "Share",
    icon: "square.and.arrow.up",
  },
  {
    title: "Radio of the artist",
    icon: "dot.radiowaves.left.and.right",
  },
  {
    title: "Report",
    icon: "exclamationmark.bubble",
  },
  {
    title: "Show spotify's code",
    icon: "barcode",
  },
]

function HeaderAvatar() {
  return <Avatar.Image size={70} source={require("@/assets/images/justice-justice-cover.jpeg")} />
}

const IconItem = ({ icon }: { icon: SymbolViewProps["name"] }) => (
  <IconSymbol name={icon} size={24} color={Colors.dark.tint} />
)

export const ArtistMoreOptions = forwardRef<BottomSheetModal>((_, ref) => {
  const { top } = useSafeAreaInsets()
  return (
    <BottomSheetModal
      backdropComponent={BottomSheetBackdrop}
      backgroundStyle={styles.container}
      snapPoints={["60%", "100%"]}
      index={1}
      topInset={top}
      ref={ref}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView>
        <View style={styles.header}>
          <List.Item left={HeaderAvatar} title="Justin Bieber" titleStyle={styles.headerTitle} />
        </View>
        <View style={styles.content}>
          {OPTIONS.map(option => (
            <List.Item
              key={option.title}
              left={() => IconItem({ icon: option.icon })}
              title={option.title}
              titleStyle={{ color: Colors.dark.tint, fontSize: 18 }}
              onPress={() => {}}
            />
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  content: {
    paddingHorizontal: 20,
    tintColor: Colors.dark.tint,
    paddingVertical: 10,
    gap: 5,
  },
  handle: {
    backgroundColor: Colors.dark.icon,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark.text,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: Colors.dark.tint,
    fontSize: 20,
  },
})

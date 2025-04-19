import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { SymbolViewProps } from "expo-symbols"
import { forwardRef, JSX, useImperativeHandle, useRef } from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { List } from "react-native-paper"
import { Colors } from "@/constants/Colors"
import { ThemedText } from "../ThemedText"
import { IconSymbol } from "../ui/IconSymbol"

interface Option {
  id: string
  label: string
  icon: SymbolViewProps["name"]
}

const SHEET_OPTIONS: Option[] = [
  {
    id: "add-playlist",
    label: "Add to Playlist",
    icon: "plus.circle",
  },
  {
    id: "go-artist",
    label: "Go to Artist",
    icon: "person.fill",
  },
  {
    id: "go-album",
    label: "Go to Album",
    icon: "square.stack",
  },
  {
    id: "share",
    label: "Share",
    icon: "square.and.arrow.up",
  },
  {
    id: "hide",
    label: "Hide this song",
    icon: "eye.slash",
  },
  {
    id: "spotify-code",
    label: "Show Spotify Code",
    icon: "qrcode",
  },
  {
    id: "download",
    label: "Download",
    icon: "arrow.down.circle",
  },
  {
    id: "report",
    label: "Report",
    icon: "exclamationmark.triangle",
  },
  {
    id: "reproduction-list",
    label: "Add to reproduction list",
    icon: "list.bullet",
  },
]

const SNAP_OPTIONS = ["70%", "90%"]

function SongImage() {
  return <Image style={styles.songImage} source={require("@/assets/images/justice-justice-cover.jpeg")} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BSBackdrop(props: any) {
  return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={"close"} />
}

export interface SheetOptionsMethods {
  open: () => void
  close: () => void
}

export const SheetOptions = forwardRef<SheetOptionsMethods>((_, ref) => {
  const sheet = useRef<BottomSheet>(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      sheet.current?.snapToIndex(0)
    },
    close: () => {
      sheet.current?.close()
    },
  }))

  return (
    <BottomSheet
      ref={sheet}
      key="SongOptions"
      snapPoints={SNAP_OPTIONS}
      backgroundStyle={{ backgroundColor: Colors.dark.background }}
      handleIndicatorStyle={{ backgroundColor: Colors.dark.icon }}
      index={-1}
      enableDynamicSizing={false}
      enablePanDownToClose
      backdropComponent={BSBackdrop}
    >
      <BottomSheetScrollView style={styles.container}>
        <List.Item
          left={SongImage}
          title="Ghost"
          style={styles.itemInformationContainer}
          description="Justin Bieber"
          titleStyle={styles.title}
          descriptionStyle={styles.desc}
        />
        <View style={styles.optionsContainer}>
          {SHEET_OPTIONS.map(option => (
            <TouchableOpacity key={option.id} style={styles.optionContainer}>
              <IconSymbol name={option.icon} color={Colors.dark.tabIconDefault} size={30} />
              <ThemedText style={styles.optionText}>{option.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  itemInformationContainer: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark.icon,
    paddingHorizontal: 20,
  },
  songImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 2,
  },
  title: {
    color: Colors.dark.tint,
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 5,
  },
  desc: {
    color: Colors.dark.text,
    fontWeight: "500",
    fontSize: 16,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 30,
    paddingBottom: 40,
    paddingTop: 20,
  },
  optionContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
  },
})

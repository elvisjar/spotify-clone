import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SymbolViewProps } from "expo-symbols"
import React, { useRef } from "react"
import { View } from "react-native"
import { HapticTab } from "@/components/HapticTab"
import { PlaybackModal } from "@/components/PlaybackModal/PlaybackModal"
import { SmallController } from "@/components/SmallController"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { TabBarBackground } from "@/components/ui/TabBarBackground"
import { Colors } from "@/constants/Colors"

function TabIcon(color: string, name: SymbolViewProps["name"]) {
  return <IconSymbol size={28} name={name} color={color} />
}

export default function TabLayout() {
  const playbackModalRef = useRef<BottomSheetModal>(null)

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.dark.tint,
          tabBarInactiveTintColor: Colors.dark.icon,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: { position: "absolute", paddingHorizontal: 20, borderColor: "transparent" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => TabIcon(color, "house.fill"),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => TabIcon(color, "magnifyingglass"),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color }) => TabIcon(color, "music.note.house.fill"),
          }}
        />
      </Tabs>
      <SmallController presentPlayback={() => playbackModalRef.current?.present()} />
      <PlaybackModal ref={playbackModalRef} close={() => playbackModalRef.current?.close()} />
      <StatusBar style="light" animated />
    </View>
  )
}

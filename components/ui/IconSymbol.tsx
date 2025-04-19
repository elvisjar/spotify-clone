// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { SymbolWeight } from "expo-symbols"
import React from "react"
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native"

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "envelope.fill": "mail",
  "play.fill": "play-arrow",
  shuffle: "shuffle",
  ellipsis: "more-vert",
  "plus.circle": "add-circle-outline",
  "pause.fill": "pause",
  "music.note.house.fill": "library-music",
  magnifyingglass: "search",
  "arrow.left": "arrow-back-ios",
  "pause.circle.fill": "pause-circle",
  "backward.fill": "skip-previous",
  "forward.fill": "skip-next",
  repeat: "repeat",
  "play.circle.fill": "play-circle",
  "checkmark.circle.fill": "check-circle",
  "minus.circle": "remove-circle-outline",
  "chevron.down": "keyboard-arrow-down",
  "person.fill": "person",
  "square.stack": "collections",
  "square.and.arrow.up": "share",
  "eye.slash": "visibility-off",
  qrcode: "qr-code",
  "arrow.down.circle": "download",
  "exclamationmark.triangle": "warning",
  "list.bullet": "list",
  xmark: "close",
  "dot.radiowaves.left.and.right": "radio",
  "exclamationmark.bubble": "report-problem",
  barcode: "qr-code-2",
} as Partial<Record<import("expo-symbols").SymbolViewProps["name"], React.ComponentProps<typeof MaterialIcons>["name"]>>

export type IconSymbolName = keyof typeof MAPPING

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />
}

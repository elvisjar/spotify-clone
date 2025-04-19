import { StyleSheet, Platform } from "react-native"

import { Colors } from "./Colors"

export const STYLE = StyleSheet.create({
  screenSpacing: {
    paddingHorizontal: 16,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    minHeight: Platform.OS === "ios" ? 44 : 48,
    flexDirection: "row",
    gap: 20,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
})

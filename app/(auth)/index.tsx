import Fontisto from "@expo/vector-icons/Fontisto"
import { LinearGradient } from "expo-linear-gradient"
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ThemedText } from "../../components/ThemedText"
import { Colors } from "../../constants/Colors"
import { STYLE } from "../../constants/STYLE"

const presentation = () => {
  const onSignUp = () => {
    Alert.alert("No Sign Up", "This clone doesn't provide this.", [
      {
        text: "Ok",
      },
    ])
  }

  return (
    <LinearGradient
      colors={[Colors.dark.background, "dimgrey"]}
      locations={[0.7, 1]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.background}
    >
      <SafeAreaView style={[{ flex: 1 }, STYLE.screenSpacing]}>
        <View style={styles.content}>
          <Fontisto name="spotify" size={72} color={Colors.dark.tint} />
          <ThemedText type="title" style={styles.textHeader}>
            Millones de canciones. {"\n"} Gratis en Spotify.
          </ThemedText>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={onSignUp}
            activeOpacity={0.8}
            style={[STYLE.btn, { backgroundColor: Colors.primary.background }]}
          >
            <ThemedText style={{ color: Colors.primary.tint }} type="defaultSemiBold">
              Sign up for free
            </ThemedText>
          </TouchableOpacity>
          <Link href="/(auth)/signin" asChild={true} style={[STYLE.btn, STYLE.btnOutline]}>
            <TouchableOpacity activeOpacity={0.8}>
              <ThemedText type="defaultSemiBold">Sign in</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" animated />
    </LinearGradient>
  )
}

export default presentation

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  textHeader: {
    textAlign: "center",
    color: Colors.dark.tint,
  },
  footer: {
    minHeight: 100,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingBottom: 20,
    gap: 20,
  },
})

import Fontisto from "@expo/vector-icons/Fontisto"
import Ionicons from "@expo/vector-icons/Ionicons"
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import BackgroundLoading from "@/components/BackgroundLoading"
import { ThemedText } from "@/components/ThemedText"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { Colors } from "@/constants/Colors"
import { STYLE } from "@/constants/STYLE"

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const showAlert = (title: string, msg?: string) => {
    Alert.alert(title, msg, [
      {
        text: "Ok",
      },
    ])
  }

  async function signin() {
    try {
      setIsLoading(true)
      await googleSignIn()
    } catch (error) {
      if (error instanceof Error && error.message === "No ID token found") return
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "935804379535-n3mlpev8cqi9rbsjuccqinmpgmkvhbe3.apps.googleusercontent.com",
      iosClientId: "935804379535-5ovg494d9oe2elpi0h73c44o6tooc3og.apps.googleusercontent.com",
    })
  }, [])

  return (
    <SafeAreaView edges={["bottom"]} style={[styles.background, STYLE.screenSpacing]}>
      <View style={styles.content}>
        <Fontisto name="spotify" size={72} color={Colors.dark.tint} />
        <ThemedText type="title" style={{ textAlign: "center" }}>
          Sign up in {"\n"}Spotify.
        </ThemedText>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => showAlert("Not available", "Only sign in with google.")}
          style={[STYLE.btn, { backgroundColor: Colors.primary.background }]}
        >
          <IconSymbol size={28} name="envelope.fill" color={Colors.primary.tint} />
          <ThemedText type="defaultSemiBold" style={{ color: Colors.primary.tint }}>
            Sign up with email
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[STYLE.btn, STYLE.btnOutline]} onPress={signin}>
          <Ionicons name="logo-google" size={28} color={Colors.dark.tint} />
          <ThemedText type="defaultSemiBold" style={{ color: Colors.dark.tint }}>
            Sign up with google
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showAlert("Not available", "Only sign in with google.")}
          style={[STYLE.btn, STYLE.btnOutline]}
        >
          <Ionicons name="logo-facebook" size={28} color={Colors.dark.tint} />
          <ThemedText type="defaultSemiBold" style={{ color: Colors.dark.tint }}>
            Sign up with facebook
          </ThemedText>
        </TouchableOpacity>
        <View style={styles.footerBtns}>
          <ThemedText style={styles.textCenter}>Don&apos;t have an account?</ThemedText>
          <TouchableOpacity onPress={() => showAlert("Not available", "Only sign in with google.")} style={[STYLE.btn]}>
            <ThemedText type="defaultSemiBold" style={{ color: Colors.dark.tint }}>
              Sign up
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="inverted" animated />
      <BackgroundLoading isLoading={isLoading} />
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  footer: {
    marginHorizontal: 5,
    gap: 20,
  },
  textCenter: {
    alignSelf: "center",
  },
  footerBtns: {
    marginTop: 10,
    gap: 10,
  },
})

async function googleSignIn() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  const signInResult = await GoogleSignin.signIn()
  const idToken = signInResult.data?.idToken
  if (!idToken) {
    throw new Error("No ID token found")
  }
  // eslint-disable-next-line import/no-named-as-default-member
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  return auth().signInWithCredential(googleCredential)
}

import { Stack, Redirect } from "expo-router"
import { useAuth } from "@/components/AuthenticationLoader"
import { Colors } from "@/constants/Colors"

export default function () {
  const { user } = useAuth()

  if (user) {
    return <Redirect href={"/(tabs)"} withAnchor />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signin"
        options={{
          headerBackButtonDisplayMode: "minimal",
          title: "",
          headerTintColor: Colors.dark.tint,
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
        }}
      />
    </Stack>
  )
}

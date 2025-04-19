import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { createContext, useState, ReactNode, useEffect, useContext } from "react"
import { AuthenticationLoader } from "./AuthenticationLoader"

interface AppLoadedContextI {
  resourcesLoaded: boolean
  authLoaded: boolean
  setAuthLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

interface AppLoadedProps {
  children?: ReactNode
}

const defaultAppLoadedContext: AppLoadedContextI = {
  resourcesLoaded: false,
  authLoaded: false,
  setAuthLoaded: () => {},
}

const AppLoadedContext = createContext<AppLoadedContextI>(defaultAppLoadedContext)

export const AppLoaded = ({ children }: AppLoadedProps) => {
  const [fontLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })
  const [authLoaded, setAuthLoaded] = useState<boolean>(false)
  const contextValue = {
    resourcesLoaded: fontLoaded,
    authLoaded,
    setAuthLoaded,
  }
  const fullLoaded = authLoaded && fontLoaded

  useEffect(() => {
    if (fullLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fullLoaded])

  // if (!fullLoaded) {
  //   return null
  // }

  return (
    <AppLoadedContext.Provider value={contextValue}>
      <AuthenticationLoader setAuthenticationLoaded={setAuthLoaded}>
        <StatusBar style="auto" animated />
        {fullLoaded && children}
      </AuthenticationLoader>
    </AppLoadedContext.Provider>
  )
}

export const useAppLoaded = () => {
  const context = useContext(AppLoadedContext)
  if (!context) {
    throw Error("useAppLoaded debe de estar dentro de AppLoadedContext.Provider")
  }

  return context
}

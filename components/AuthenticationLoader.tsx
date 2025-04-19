import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthenticationContextI {
  user: FirebaseAuthTypes.User | null
}

interface AuthenticationLoaderProps {
  setAuthenticationLoaded: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const AuthenticationContext = createContext<AuthenticationContextI>({ user: null })
const AuthenticationLoader = (props: AuthenticationLoaderProps) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setuser] = useState<FirebaseAuthTypes.User | null>(null)

  function onAuthStateChanged(_user: FirebaseAuthTypes.User | null) {
    setuser(_user)
    if (initializing) {
      props.setAuthenticationLoaded(true)
      setInitializing(false)
    }
  }

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged)
    return subscribe
  }, [])

  return <AuthenticationContext.Provider value={{ user }}>{props.children}</AuthenticationContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw Error("useAuth debe de estar dentro de AuthenticationLoader.Provider")
  }
  return context
}

export { AuthenticationLoader, useAuth }

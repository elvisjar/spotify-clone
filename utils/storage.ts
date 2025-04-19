// storage.js
import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

export const getStoredToken = () => {
  const token = storage.getString("access_token_spotify")
  const expiresAt = storage.getNumber("expires_at")
  const refresh_token = storage.getString("refresh_token")
  return { token, expiresAt, refresh_token }
}

export const saveToken = (token: string, expiresAt: number, refreshToken: string) => {
  storage.set("access_token_spotify", token)
  storage.set("expires_at", expiresAt)
  storage.set("refresh_token", refreshToken)
}

export const clearToken = () => {
  storage.delete("access_token")
  storage.delete("expires_at")
}

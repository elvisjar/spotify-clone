import axios from "axios"
import { getStoredToken, saveToken } from "./storage"

export const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
})

let isRefreshing = false
let refreshPromise: Promise<unknown> | null = null

const refreshAuthToken = async (refresh: boolean = false) => {
  const { refresh_token } = getStoredToken()

  if (!isRefreshing) {
    isRefreshing = true
    refreshPromise = axios
      .post(
        "https://accounts.spotify.com/api/token",
        refresh
          ? {
              grant_type: "refresh_token",
              refresh_token: refresh_token,
              client_id: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID,
            }
          : {
              client_id: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID,
              client_secret: process.env.EXPO_PUBLIC_SPOTIFY_SECRET,
              grant_type: "client_credentials",
            },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      )
      .then(({ data }) => {
        const expiresIn = 3600 * 1000
        const expiresAt = Date.now() + expiresIn
        saveToken(data.access_token, expiresAt, data?.refresh_token || "")
        return data.access_token
      })
      .catch(err => {
        throw err
      })
      .finally(() => {
        isRefreshing = false
      })
  }
  return refreshPromise
}

spotifyApi.interceptors.request.use(
  async config => {
    // eslint-disable-next-line prefer-const
    let { token, expiresAt, refresh_token } = getStoredToken()

    if (!token) {
      const newToken = await refreshAuthToken()
      if (typeof newToken === "string") {
        token = newToken
      } else {
        throw new Error("Failed to refresh auth token")
      }
    }

    if (refresh_token || !expiresAt || Date.now() >= expiresAt) {
      const newToken = await refreshAuthToken(true)
      if (typeof newToken === "string") {
        token = newToken
      } else {
        throw new Error("Failed to refresh auth token")
      }
    }

    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error),
)

spotifyApi.interceptors.response.use(
  response => response,
  async error => {
    if (error.response) {
      const { data, status } = error.response
      console.error(`Spotify API Error [${status}]:`, data.error)
    } else if (error.request) {
      console.error("Network Error:", error.message)
    } else {
      console.error("Error:", error.message)
    }
    return Promise.reject(error)
  },
)

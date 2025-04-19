import React, { createContext, useContext, useState } from "react"
import { cancelAnimation, Easing, runOnJS, SharedValue, useSharedValue, withTiming } from "react-native-reanimated"

interface PlaybackContextType {
  currentTime: SharedValue<number>
  currentTimeJs: number
  songDuration: number
  isPlaying: boolean
  doneListening: boolean
  onRepeat: boolean
  onShuffle: boolean
  play: () => void
  pause: () => void
  seek: (time: number) => void
  toggleShuffle: () => void
  toggleRepeat: () => void
}

// Create Context
const PlaybackContext = createContext<PlaybackContextType | null>(null)

// Provider Component
export const PlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentTime = useSharedValue(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTimeJs, setCurrentTimeJs] = useState(0)
  const [songDuration, _setSongDuration] = useState(252000 / 15)
  const [doneListening, setDoneListening] = useState(false)
  const [onRepeat, setOnRepeat] = useState(false)
  const [onShuffle, setOnShuffle] = useState(false)

  function play() {
    setIsPlaying(true)
    currentTime.value = withTiming(
      songDuration,
      { duration: songDuration - currentTime.value, easing: Easing.linear },
      finished => {
        if (!finished) return
        if (!doneListening) {
          runOnJS(setIsPlaying)(false)
          runOnJS(setDoneListening)(true)
        } else {
          currentTime.value = 0
          runOnJS(setDoneListening)(false)
          runOnJS(play)()
        }
      },
    )
  }

  const pause = () => {
    setIsPlaying(false)
    cancelAnimation(currentTime)
  }

  function toggleShuffle() {
    setOnShuffle(!onShuffle)
  }

  function toggleRepeat() {
    setOnRepeat(!onRepeat)
  }

  const seek = (time: number) => {
    "worklet"
    cancelAnimation(currentTime)
    currentTime.value = time
    runOnJS(play)()
  }

  const store = {
    currentTime,
    isPlaying,
    songDuration,
    doneListening,
    onRepeat,
    play,
    pause,
    seek,
    onShuffle,
    toggleRepeat,
    toggleShuffle,
    currentTimeJs,
  }

  return <PlaybackContext.Provider value={store}>{children}</PlaybackContext.Provider>
}

// Hook to use the context
export const usePlayback = (): PlaybackContextType => {
  const context = useContext(PlaybackContext)
  if (!context) {
    throw new Error("usePlayback must be used within a PlaybackProvider")
  }
  return context
}

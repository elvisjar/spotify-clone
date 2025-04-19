import edSheeranDivide from "@/assets/images/ed-sheeran-divide.jpeg"
import edSheeranX from "@/assets/images/ed-sheeran-x.jpeg"
import imageDragons from "@/assets/images/imagine-dragons.jpeg"
import JusticeJusticeCover from "@/assets/images/justice-justice-cover.jpeg"
import justice from "@/assets/images/justice.jpeg"

export function getRandomImage() {
  const images = [imageDragons, JusticeJusticeCover, justice, edSheeranDivide, edSheeranX]

  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

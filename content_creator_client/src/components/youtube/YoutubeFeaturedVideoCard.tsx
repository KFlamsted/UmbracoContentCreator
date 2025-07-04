import { useState } from 'react'
import YouTube from 'react-youtube'
import {
  CARD_CLASSES,
  BACKDROP_BLUR_CARD_CLASSES,
  DESIGN_TOKENS,
} from '../../constants/styles'

interface YoutubeFeaturedVideoCardProps {
  videoUrl: string
  hasBackgroundImage?: boolean
}

// Extract YouTube video ID from various URL formats
const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

const YoutubeFeaturedVideoCard: React.FC<YoutubeFeaturedVideoCardProps> = ({
  videoUrl,
  hasBackgroundImage = false,
}) => {
  const [videoError, setVideoError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const videoId = extractVideoId(videoUrl)
  const cardClasses = hasBackgroundImage
    ? BACKDROP_BLUR_CARD_CLASSES
    : CARD_CLASSES

  if (!videoId || videoError) return null

  const youtubeOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  }

  return (
    <div className={cardClasses}>
      {isLoading && (
        <div className={`${DESIGN_TOKENS.TEXT_MUTED} text-center py-4`}>
          Loading video...
        </div>
      )}
      <div className="aspect-video">
        <YouTube
          videoId={videoId}
          opts={youtubeOptions}
          onReady={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setVideoError(true)
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default YoutubeFeaturedVideoCard

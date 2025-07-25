import { useState } from 'react'
import YouTube from 'react-youtube'
import { SECTION_SPACING } from '../../constants/styles'

interface YoutubeFeaturedVideoComponentProps {
  /** Unique identifier for the youtube featured video card */
  id: string
  videoUrl: string
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

const YoutubeFeaturedVideoComponent: React.FC<
  YoutubeFeaturedVideoComponentProps
> = ({ id, videoUrl }) => {
  const [videoError, setVideoError] = useState(false)
  const videoId = extractVideoId(videoUrl)
  const componentId = id

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
    <div id={componentId} className={SECTION_SPACING}>
      <div id={`${componentId}-aspect`} className="aspect-video">
        <YouTube
          videoId={videoId}
          opts={youtubeOptions}
          onError={() => {
            setVideoError(true)
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default YoutubeFeaturedVideoComponent

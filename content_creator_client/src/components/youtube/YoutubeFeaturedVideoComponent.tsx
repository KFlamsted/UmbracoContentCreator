import { useState } from 'react'
import { SectionComponent, VideoComponent } from '../ui'

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

  return (
    <SectionComponent id={componentId} variant="card-section" spacing="default">
      <VideoComponent
        id={`${componentId}-video`}
        videoId={videoId}
        variant="featured"
        aspectRatio="video"
        rounded={true}
        onError={() => setVideoError(true)}
      />
    </SectionComponent>
  )
}

export default YoutubeFeaturedVideoComponent

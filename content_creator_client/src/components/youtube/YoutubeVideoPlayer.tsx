import { useState } from 'react'
import { VideoComponent } from '../ui'

interface YoutubeVideoPlayerProps {
  videoId: string
}

const YoutubeVideoPlayer: React.FC<YoutubeVideoPlayerProps> = ({ videoId }) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) return null

  return (
    <VideoComponent
      id={`youtube-video-player-${videoId}`}
      videoId={videoId}
      variant="player"
      aspectRatio="video"
      rounded
      onError={() => setHasError(true)}
    />
  )
}

export default YoutubeVideoPlayer

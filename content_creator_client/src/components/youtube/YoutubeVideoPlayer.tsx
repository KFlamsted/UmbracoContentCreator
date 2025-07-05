import { useState } from 'react'
import YouTube from 'react-youtube'
import { DESIGN_TOKENS } from '../../constants/styles'

interface YoutubeVideoPlayerProps {
  videoId: string
}

const YoutubeVideoPlayer: React.FC<YoutubeVideoPlayerProps> = ({ videoId }) => {
  const [hasError, setHasError] = useState(false)

  const youtubeOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  }

  const handlePlayerError = () => {
    setHasError(true)
  }

  if (hasError) return null

  return (
    <div
      className={`${DESIGN_TOKENS.BORDER_RADIUS} overflow-hidden ${DESIGN_TOKENS.YOUTUBE_CARD_BG}`}
    >
      <div className={`aspect-video`}>
        <YouTube
          videoId={videoId}
          opts={youtubeOptions}
          onError={handlePlayerError}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default YoutubeVideoPlayer

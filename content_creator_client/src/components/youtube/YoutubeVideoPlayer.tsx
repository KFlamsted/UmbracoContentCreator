import { useState } from 'react'
import YouTube from 'react-youtube'
import {
  LOADING_MESSAGE_CLASSES,
  ERROR_MESSAGE_CLASSES,
  DESIGN_TOKENS,
} from '../../constants/styles'

interface YoutubeVideoPlayerProps {
  videoId: string
}

const YoutubeVideoPlayer: React.FC<YoutubeVideoPlayerProps> = ({
  videoId,
}) => {
  const [isLoading, setIsLoading] = useState(true)
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

  const handlePlayerReady = () => {
    setIsLoading(false)
  }

  const handlePlayerError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div
      className={`${DESIGN_TOKENS.BORDER_RADIUS} overflow-hidden ${DESIGN_TOKENS.YOUTUBE_CARD_BG}`}
    >
      {isLoading && (
        <div
          className={`aspect-video flex items-center justify-center ${DESIGN_TOKENS.YOUTUBE_CARD_OVERLAY}`}
        >
          <p className={LOADING_MESSAGE_CLASSES}>Loading player...</p>
        </div>
      )}

      {hasError && (
        <div
          className={`aspect-video flex items-center justify-center ${DESIGN_TOKENS.YOUTUBE_CARD_OVERLAY}`}
        >
          <div className="text-center">
            <p className={ERROR_MESSAGE_CLASSES}>Failed to load video</p>
          </div>
        </div>
      )}

      <div className={`aspect-video ${isLoading ? 'hidden' : ''}`}>
        <YouTube
          videoId={videoId}
          opts={youtubeOptions}
          onReady={handlePlayerReady}
          onError={handlePlayerError}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default YoutubeVideoPlayer

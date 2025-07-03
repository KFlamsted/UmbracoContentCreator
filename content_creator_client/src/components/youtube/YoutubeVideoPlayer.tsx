import { useState } from 'react'
import YouTube from 'react-youtube'
import { LOADING_MESSAGE_CLASSES, ERROR_MESSAGE_CLASSES, DESIGN_TOKENS } from '../../constants/styles'
import { sanitizeHtml } from '../../utility/textUtility'

interface YoutubeVideoPlayerProps {
  videoId: string
  onPlayerReady?: () => void
  onPlayerError?: () => void
  onBackToThumbnail?: () => void
  showBackButton?: boolean
  videoTitle?: string
}

const YoutubeVideoPlayer: React.FC<YoutubeVideoPlayerProps> = ({
  videoId,
  onPlayerReady,
  onPlayerError,
  onBackToThumbnail,
  showBackButton = true,
  videoTitle
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
    onPlayerReady?.()
  }

  const handlePlayerError = () => {
    setIsLoading(false)
    setHasError(true)
    onPlayerError?.()
  }

  return (
    <div className={`${DESIGN_TOKENS.BORDER_RADIUS} overflow-hidden ${DESIGN_TOKENS.YOUTUBE_CARD_BG}`}>
      {isLoading && (
        <div className={`aspect-video flex items-center justify-center ${DESIGN_TOKENS.YOUTUBE_CARD_OVERLAY}`}>
          <p className={LOADING_MESSAGE_CLASSES}>Loading player...</p>
        </div>
      )}

      {hasError && (
        <div className={`aspect-video flex items-center justify-center ${DESIGN_TOKENS.YOUTUBE_CARD_OVERLAY}`}>
          <div className="text-center">
            <p className={ERROR_MESSAGE_CLASSES}>Failed to load video</p>
            {showBackButton && onBackToThumbnail && (
              <button
                onClick={onBackToThumbnail}
                className={`mt-2 text-sm ${DESIGN_TOKENS.YOUTUBE_VIDEO_LINK}`}
              >
                Back to thumbnail
              </button>
            )}
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

      {videoTitle && (
        <div className={`p-4 ${DESIGN_TOKENS.YOUTUBE_CARD_OVERLAY}`}>
          <h4 className={DESIGN_TOKENS.YOUTUBE_VIDEO_TITLE}>
            {sanitizeHtml(videoTitle)}
          </h4>
          {showBackButton && onBackToThumbnail && (
            <button
              onClick={onBackToThumbnail}
              className={`mt-2 text-sm ${DESIGN_TOKENS.YOUTUBE_VIDEO_LINK}`}
            >
              Back to thumbnail
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default YoutubeVideoPlayer 
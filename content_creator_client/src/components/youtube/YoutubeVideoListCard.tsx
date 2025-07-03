import {
  BACKDROP_BLUR_CARD_CLASSES,
  DESIGN_TOKENS,
  ERROR_MESSAGE_CLASSES,
} from '../../constants/styles'
import { useYouTubeData } from '../../hooks/useYouTubeData'
import YoutubeVideoList from './YoutubeVideoList'
import type { YoutubePage } from '../../model/YoutubePage'

interface YoutubeVideoListCardProps {
  channel: YoutubePage
  hasBackgroundImage?: boolean
}

const YoutubeVideoListCard: React.FC<YoutubeVideoListCardProps> = ({
  channel,
  hasBackgroundImage = false,
}) => {
  const maxVideos = channel.amountOfVideos || 6
  const { videos, loading, error, refetch } = useYouTubeData(
    channel.channelId ?? null,
    maxVideos
  )

  const cardClasses = hasBackgroundImage
    ? BACKDROP_BLUR_CARD_CLASSES
    : `w-full max-w-6xl ${DESIGN_TOKENS.SURFACE_BG} bg-opacity-95 ${DESIGN_TOKENS.BORDER_RADIUS} backdrop-blur-sm ${DESIGN_TOKENS.CARD_SHADOW} ${DESIGN_TOKENS.CARD_PADDING} mb-2`


  if (!channel.channelId) {
    return (
      <div className={cardClasses}>
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-white mb-2">
            Latest Videos
          </h3>
          <p className={ERROR_MESSAGE_CLASSES}>
            YouTube Channel ID not configured for this page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cardClasses}>
      <YoutubeVideoList
        videos={videos || []}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
    </div>
  )
}

export default YoutubeVideoListCard

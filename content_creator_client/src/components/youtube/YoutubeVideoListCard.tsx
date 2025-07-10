import {
  BACKDROP_BLUR_CARD_CLASSES,
  DESIGN_TOKENS,
} from '../../constants/styles'
import { useYouTubeData } from '../../hooks/useYouTubeData'
import YoutubeVideoList from './YoutubeVideoList'
import type { YoutubePage } from '../../model/YoutubePage'

interface YoutubeVideoListCardProps {
  /** Unique identifier for the youtube video list card */
  id?: string
  channel: YoutubePage
  hasBackgroundImage?: boolean
}

const YoutubeVideoListCard: React.FC<YoutubeVideoListCardProps> = ({
  id,
  channel,
  hasBackgroundImage = false,
}) => {
  const maxVideos = channel?.amountOfVideos ?? 6
  const { videos, loading, error } = useYouTubeData(
    channel.channelId ?? null,
    maxVideos
  )

  const cardClasses = hasBackgroundImage
    ? BACKDROP_BLUR_CARD_CLASSES
    : `w-full max-w-6xl ${DESIGN_TOKENS.SURFACE_BG} bg-opacity-95 ${DESIGN_TOKENS.BORDER_RADIUS} backdrop-blur-sm ${DESIGN_TOKENS.CARD_SHADOW} ${DESIGN_TOKENS.CARD_PADDING} mb-2`

  if (!channel.channelId) return null

  const cardId = id || `youtube-video-list-card-${channel.channelId}`
  const listId = id ? `${id}-list` : `youtube-video-list-${channel.channelId}`

  return (
    <div id={cardId} className={cardClasses}>
      <YoutubeVideoList 
        id={listId}
        videos={videos ?? []} 
        loading={loading} 
        error={error} 
      />
    </div>
  )
}

export default YoutubeVideoListCard

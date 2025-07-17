import { useYouTubeData } from '../../hooks/useYouTubeData'
import YoutubeVideoList from './YoutubeVideoList'
import type { YoutubePage } from '../../model/YoutubePage'

interface YoutubeVideoListComponentProps {
  /** Unique identifier for the youtube video list card */
  id: string
  channel: YoutubePage
}

const YoutubeVideoListComponent: React.FC<YoutubeVideoListComponentProps> = ({
  id,
  channel,
}) => {
  const maxVideos = channel?.amountOfVideos ?? 6
  const { videos, loading, error } = useYouTubeData(
    channel.channelId ?? null,
    maxVideos
  )

  if (!channel.channelId) return null

  const listId = `${id}-list`

  return (
    <div id={id}>
      <YoutubeVideoList
        id={listId}
        videos={videos ?? []}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default YoutubeVideoListComponent

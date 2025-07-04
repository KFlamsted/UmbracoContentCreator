import { GridCardComponent } from '../grid'
import YoutubeVideoPlayer from './YoutubeVideoPlayer'
import { LOADING_MESSAGE_CLASSES } from '../../constants/styles'
import type { VideoSummary } from '../../model/VideoSummary'

interface YoutubeVideoListProps {
  videos: VideoSummary[]
  loading: boolean
  error: string | null
}

const YoutubeVideoList: React.FC<YoutubeVideoListProps> = ({
  videos,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className={LOADING_MESSAGE_CLASSES}>Loading latest videos...</p>
      </div>
    )
  }

  if (error) return null

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className={LOADING_MESSAGE_CLASSES}>
          No videos found for this channel.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Video Grid */}
      <GridCardComponent
        items={videos}
        columns="1-md-2-lg-3"
        equalHeight
        renderItem={(video) => <YoutubeVideoPlayer videoId={video.videoId} />}
        getItemKey={(video) => video.videoId}
        emptyMessage="No videos available"
        className="!bg-transparent !shadow-none !p-0 !mb-0" // Override grid card styling for custom layout
      />
    </>
  )
}

export default YoutubeVideoList

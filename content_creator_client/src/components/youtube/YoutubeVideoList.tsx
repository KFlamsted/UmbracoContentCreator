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
      <div id="youtube-video-list-loading" className="text-center py-8">
        <p id="youtube-video-list-loading-text" className={LOADING_MESSAGE_CLASSES}>Loading latest videos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div id="youtube-video-list-error" className="text-center py-8">
        <p id="youtube-video-list-error-text" className="text-red-600">Error loading videos: {error}</p>
      </div>
    )
  }

  return (
    <div id="youtube-video-list-container">
      <GridCardComponent
        items={videos}
        columns="1-md-2"
        equalHeight
        renderItem={(video) => <YoutubeVideoPlayer videoId={video.videoId} />}
        getItemKey={(video) => video.videoId}
        // Override grid card styling for custom layout
        // TODO: Use this everywhere on grids later
        className="!bg-transparent !shadow-none !p-0 !mb-0" 
      />
    </div>
  )
}

export default YoutubeVideoList

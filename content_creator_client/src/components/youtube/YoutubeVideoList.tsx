import { GridCardComponent } from '../grid'
import YoutubeVideoPlayer from './YoutubeVideoPlayer'
import { LOADING_MESSAGE_CLASSES } from '../../constants/styles'
import type { VideoSummary } from '../../model/VideoSummary'

interface YoutubeVideoListProps {
  /** Unique identifier for the youtube video list */
  id?: string
  videos: VideoSummary[]
  loading: boolean
  error: string | null
}

const YoutubeVideoList: React.FC<YoutubeVideoListProps> = ({
  id = 'youtube-video-list',
  videos,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div id={`${id}-loading`} className="text-center py-8">
        <p id={`${id}-loading-text`} className={LOADING_MESSAGE_CLASSES}>Loading latest videos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div id={`${id}-error`} className="text-center py-8">
        <p id={`${id}-error-text`} className="text-red-600">Error loading videos: {error}</p>
      </div>
    )
  }

  return (
    <div id={`${id}-container`}>
      <GridCardComponent
        id={`${id}-grid`}
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

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

  return (
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
  )
}

export default YoutubeVideoList

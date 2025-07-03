import { GridCardComponent } from '../grid'
import YoutubeVideoThumbnail from './YoutubeVideoThumbnail'
import YoutubeVideoPlayer from './YoutubeVideoPlayer'
import {
  LOADING_MESSAGE_CLASSES,
  ERROR_MESSAGE_CLASSES,
} from '../../constants/styles'
import type { VideoSummary } from '../../model/VideoSummary'

interface VideoPlayerState {
  [videoId: string]: {
    showPlayer: boolean
    isLoading: boolean
    hasError: boolean
  }
}

interface YoutubeVideoListProps {
  videos: VideoSummary[]
  loading: boolean
  error: string | null
  videoStates: VideoPlayerState
  onThumbnailClick: (videoId: string) => void
  onPlayerReady: (videoId: string) => void
  onPlayerError: (videoId: string) => void
  onBackToThumbnail: (videoId: string) => void
  onRetry: () => void
}

const YoutubeVideoList: React.FC<YoutubeVideoListProps> = ({
  videos,
  loading,
  error,
  videoStates,
  onThumbnailClick,
  onPlayerReady,
  onPlayerError,
  onBackToThumbnail,
  onRetry,
}) => {
  const getVideoState = (videoId: string) => {
    return (
      videoStates[videoId] || {
        showPlayer: false,
        isLoading: false,
        hasError: false,
      }
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className={LOADING_MESSAGE_CLASSES}>Loading latest videos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className={ERROR_MESSAGE_CLASSES}>Failed to load videos: {error}</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    )
  }

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
        renderItem={(video) => {
          const state = getVideoState(video.videoId)

          return state.showPlayer ? (
            <YoutubeVideoPlayer
              videoId={video.videoId}
              onPlayerReady={() => onPlayerReady(video.videoId)}
              onPlayerError={() => onPlayerError(video.videoId)}
              onBackToThumbnail={() => onBackToThumbnail(video.videoId)}
              videoTitle={video.title}
            />
          ) : (
            <YoutubeVideoThumbnail
              video={video}
              onThumbnailClick={() => onThumbnailClick(video.videoId)}
            />
          )
        }}
        getItemKey={(video) => video.videoId}
        emptyMessage="No videos available"
        className="!bg-transparent !shadow-none !p-0 !mb-0" // Override grid card styling for custom layout
      />
    </>
  )
}

export default YoutubeVideoList

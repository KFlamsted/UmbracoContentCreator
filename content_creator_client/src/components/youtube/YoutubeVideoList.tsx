import { GridComponent } from '../grid'
import YoutubeVideoPlayer from './YoutubeVideoPlayer'
import { SectionComponent, TextComponent } from '../ui'
import type { VideoSummary } from '../../model/VideoSummary'

interface YoutubeVideoListProps {
  /** Unique identifier for the youtube video list */
  id: string
  videos: VideoSummary[]
  loading: boolean
  error: string | null
}

const YoutubeVideoList: React.FC<YoutubeVideoListProps> = ({
  id,
  videos,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <SectionComponent id={`${id}-loading`} variant="card-section" spacing="default" align="center">
        <TextComponent id={`${id}-loading-text`} variant="muted">
          Loading latest videos...
        </TextComponent>
      </SectionComponent>
    )
  }

  if (error) {
    return (
      <SectionComponent id={`${id}-error`} variant="card-section" spacing="default" align="center">
        <TextComponent id={`${id}-error-text`} variant="error">
          Error loading videos: {error}
        </TextComponent>
      </SectionComponent>
    )
  }

  return (
    <SectionComponent id={`${id}-container`} variant="card-section" spacing="none">
      <GridComponent
        id={`${id}-grid`}
        items={videos}
        columns="1-md-2"
        equalHeight
        renderItem={(video) => <YoutubeVideoPlayer videoId={video.videoId} />}
        getItemKey={(video) => video.videoId}
      />
    </SectionComponent>
  )
}

export default YoutubeVideoList

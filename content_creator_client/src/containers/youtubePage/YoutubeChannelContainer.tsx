import PageTitleCard from '../../components/content/PageTitleCard'
import YoutubeFeaturedVideoCard from '../../components/youtube/YoutubeFeaturedVideoCard'
import YoutubeVideoListCard from '../../components/youtube/YoutubeVideoListCard'
import { NEWS_PAGE_CONTAINER_CLASSES } from '../../constants/styles'
import type { YoutubePage } from '../../model/YoutubePage'

interface YoutubeChannelContainerProps {
  channel: YoutubePage
}

const YoutubeChannelContainer: React.FC<YoutubeChannelContainerProps> = ({ channel }) => {
  return (
    <div className={NEWS_PAGE_CONTAINER_CLASSES}>
      <PageTitleCard title={channel.pageTitle} />
      
      {channel.featuredVideoUrl && (
        <YoutubeFeaturedVideoCard videoUrl={channel.featuredVideoUrl} />
      )}

      {/* Latest Videos List */}
      <YoutubeVideoListCard channel={channel} hasBackgroundImage={true} />
    </div>
  )
}

export default YoutubeChannelContainer 
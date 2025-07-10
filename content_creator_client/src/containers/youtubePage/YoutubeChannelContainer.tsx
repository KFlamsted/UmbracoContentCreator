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
    <div id={`youtube-channel-container-${channel.channelId || 'unknown'}`} className={NEWS_PAGE_CONTAINER_CLASSES}>
      <PageTitleCard 
        id={`youtube-channel-${channel.channelId || 'unknown'}-title-card`}
        title={channel.pageTitle} 
      />
      
      {channel.featuredVideoUrl && (
        <YoutubeFeaturedVideoCard 
          id={`youtube-channel-${channel.channelId || 'unknown'}-featured-video`}
          videoUrl={channel.featuredVideoUrl} 
        />
      )}

      {/* Latest Videos List */}
      <YoutubeVideoListCard 
        id={`youtube-channel-${channel.channelId || 'unknown'}-video-list-card`}
        channel={channel} 
        hasBackgroundImage={true} 
      />
    </div>
  )
}

export default YoutubeChannelContainer 
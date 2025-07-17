import ContentCard from '../../components/content/ContentCard'
import PageTitleSection from '../../components/content/PageTitleSection'
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
      <ContentCard
        id={`youtube-channel-${channel.channelId || 'unknown'}-content-card`}
        hasBackgroundImage={true}
      >
        <PageTitleSection 
          id={`youtube-channel-${channel.channelId || 'unknown'}-title-section`}
          title={channel.pageTitle} 
        />
        
        {channel.featuredVideoUrl && (
          <YoutubeFeaturedVideoCard 
            id={`youtube-channel-${channel.channelId || 'unknown'}-featured-video`}
            videoUrl={channel.featuredVideoUrl} 
            hasBackgroundImage={false}
          />
        )}

        {/* Latest Videos List */}
        <YoutubeVideoListCard 
          id={`youtube-channel-${channel.channelId || 'unknown'}-video-list-card`}
          channel={channel} 
          hasBackgroundImage={false} 
        />
      </ContentCard>
    </div>
  )
}

export default YoutubeChannelContainer 
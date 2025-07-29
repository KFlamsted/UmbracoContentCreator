import ContentCard from '../../components/content/ContentCard'
import PageTitleSection from '../../components/content/PageTitleSection'
import YoutubeFeaturedVideoComponent from '../../components/youtube/YoutubeFeaturedVideoComponent'
import YoutubeVideoListComponent from '../../components/youtube/YoutubeVideoListComponent'
import type { YoutubePage } from '../../model/YoutubePage'
import { ContainerComponent } from '../../components/ui'

interface YoutubeChannelContainerProps {
  channel: YoutubePage
}

const YoutubeChannelContainer: React.FC<YoutubeChannelContainerProps> = ({
  channel,
}) => {
  return (
    <ContainerComponent
      id={`youtube-channel-container-${channel.channelId || 'unknown'}`}
      variant="page" 
      padding="default"
    >
      <ContentCard
        id={`youtube-channel-${channel.channelId || 'unknown'}-content-card`}
        hasBackgroundImage={true}
      >
        <PageTitleSection
          id={`youtube-channel-${channel.channelId || 'unknown'}-title-section`}
          title={channel.pageTitle}
        />

        {channel.featuredVideoUrl && (
          <YoutubeFeaturedVideoComponent
            id={`youtube-channel-${
              channel.channelId || 'unknown'
            }-featured-video`}
            videoUrl={channel.featuredVideoUrl}
          />
        )}

        {/* Latest Videos List */}
        <YoutubeVideoListComponent
          id={`youtube-channel-${
            channel.channelId || 'unknown'
          }-video-list-card`}
          channel={channel}
        />
      </ContentCard>
    </ContainerComponent>
  )
}

export default YoutubeChannelContainer

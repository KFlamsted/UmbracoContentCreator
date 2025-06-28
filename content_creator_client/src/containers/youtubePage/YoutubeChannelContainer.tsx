import PageTitleCard from '../../components/content/PageTitleCard'
import YoutubeFeaturedVideoCard from '../../components/content/YoutubeFeaturedVideoCard'
import type { YoutubePage } from '../../model/YoutubePage'

interface YoutubeChannelContainerProps {
  channel: YoutubePage
}

const YoutubeChannelContainer: React.FC<YoutubeChannelContainerProps> = ({ channel }) => {
  return (
    <>
      <PageTitleCard title={channel.pageTitle} />
      
      {channel.featuredVideoUrl && (
        <YoutubeFeaturedVideoCard videoUrl={channel.featuredVideoUrl} />
      )}
    </>
  )
}

export default YoutubeChannelContainer 
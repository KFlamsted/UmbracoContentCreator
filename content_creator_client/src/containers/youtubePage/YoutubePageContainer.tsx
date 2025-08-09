import { useEffect, useState } from 'react'
import { useYoutubeParentPage } from '../../hooks/PageLoadHooks'
import InPageNavBar from '../../components/navigation/InPageNavBar'
import YoutubeChannelContainer from './YoutubeChannelContainer'
import type { YoutubePage } from '../../model/YoutubePage'
import { ContainerComponent } from '../../components/ui'

interface YoutubePageContainerProps {
  onStateChange: (loading: boolean, error: string | null) => void
}

const YoutubePageContainer: React.FC<YoutubePageContainerProps> = ({
  onStateChange,
}) => {
  const { content: youtubeParentPage, loading, error } = useYoutubeParentPage()
  const [activeChannel, setActiveChannel] = useState<YoutubePage | null>(null)
  const children = youtubeParentPage.children

  useEffect(() => {
    if (!activeChannel && children?.length) {
      setActiveChannel(children[0])
    }
  }, [children, activeChannel])

  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])

  return (
    <ContainerComponent id="youtube-page-container" variant="default" padding="none">
      {/* Floating In-page navigation - only show if more than one channel */}
      {(children?.length ?? 0) > 1 && (
        <div id="youtube-page-navigation-wrapper">
          <InPageNavBar
            id="youtube-channel-navigation"
            items={children ?? []}
            activeItem={activeChannel}
            onItemChange={setActiveChannel}
            getDisplayText={(item) => item.menuName ?? 'Unnamed Channel'}
            getId={(item) => item.id ?? ''}
            floating
          />
        </div>
      )}

      {/* Active channel content */}
      {activeChannel && (
        <div id="youtube-page-active-channel-wrapper">
          <YoutubeChannelContainer channel={activeChannel} />
        </div>
      )}
    </ContainerComponent>
  )
}

export default YoutubePageContainer

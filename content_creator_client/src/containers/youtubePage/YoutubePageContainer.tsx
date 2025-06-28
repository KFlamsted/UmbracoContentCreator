import { useEffect, useState } from 'react'
import { useYoutubeParentPage } from '../../hooks/PageLoadHooks'
import InPageNavBarComponent from '../../components/navigation/InPageNavBarComponent'
import YoutubeChannelContainer from './YoutubeChannelContainer'
import type { YoutubePage } from '../../model/YoutubePage'

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
    <>
      {/* Floating In-page navigation - only show if more than one channel */}
      {(children?.length ?? 0) > 1 && (
        <InPageNavBarComponent
          items={children ?? []}
          activeItem={activeChannel}
          onItemChange={setActiveChannel}
          getDisplayText={(item) => item.menuName ?? 'Unnamed Channel'}
          getId={(item) => item.id ?? ''}
          floating
        />
      )}

      {/* Active channel content */}
      {activeChannel && <YoutubeChannelContainer channel={activeChannel} />}
    </>
  )
}

export default YoutubePageContainer

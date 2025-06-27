import { useState } from 'react'
import { useYoutubeParentPage } from '../../hooks/PageLoadHooks'
import AppShell from '../../components/appShell/AppShell'
import InPageNavBarComponent from '../../components/navigation/InPageNavBarComponent'
import YoutubeChannelContainer from './YoutubeChannelContainer'
import type { YoutubePage } from '../../model/YoutubePage'

const YoutubePageContainer: React.FC = () => {
  const { content: youtubeParentPage, loading, error } = useYoutubeParentPage()
  
  const [activeChannel, setActiveChannel] = useState<YoutubePage | null>(null)
  
  const children = youtubeParentPage.children || []
  
  // Set first channel as active by default when data loads
  if (!activeChannel && children.length > 0) {
    setActiveChannel(children[0])
  }

  const handleChannelChange = (channel: YoutubePage) => {
    setActiveChannel(channel)
  }

  return (
    <AppShell loading={loading} error={error}>
      {/* In-page navigation - only show if more than one channel */}
      {children.length > 1 && (
        <InPageNavBarComponent
          channels={children}
          activeChannel={activeChannel}
          onChannelChange={handleChannelChange}
        />
      )}
      
      {/* Active channel content */}
      {activeChannel && (
        <YoutubeChannelContainer channel={activeChannel} />
      )}
    </AppShell>
  )
}

export default YoutubePageContainer 
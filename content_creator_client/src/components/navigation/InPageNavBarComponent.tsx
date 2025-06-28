import { DESIGN_TOKENS } from '../../constants/styles'
import InPageNavButton from './InPageNavButton'
import type { YoutubePage } from '../../model/YoutubePage'

interface InPageNavBarComponentProps {
  channels: YoutubePage[]
  activeChannel: YoutubePage | null
  onChannelChange: (channel: YoutubePage) => void
}

// Smaller version of navbar for in-page navigation
const IN_PAGE_NAVBAR_CLASSES = `w-full ${DESIGN_TOKENS.HOMEPAGE_MAX_WIDTH} ${DESIGN_TOKENS.MUTED_BG} ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} py-2 px-3 mb-4`
const IN_PAGE_NAVBAR_FLEX_CLASSES = `flex gap-2 justify-center flex-wrap`

const InPageNavBarComponent: React.FC<InPageNavBarComponentProps> = ({
  channels,
  activeChannel,
  onChannelChange,
}) => {
  return (
    <nav className={IN_PAGE_NAVBAR_CLASSES}>
      <div className={IN_PAGE_NAVBAR_FLEX_CLASSES}>
        {channels.map((channel) => (
          <InPageNavButton
            key={channel.id}
            isSelected={activeChannel?.id === channel.id}
            onClick={() => onChannelChange(channel)}
          >
            {channel.menuName}
          </InPageNavButton>
        ))}
      </div>
    </nav>
  )
}

export default InPageNavBarComponent 
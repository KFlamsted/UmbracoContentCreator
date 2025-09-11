import { useState } from 'react'
import { StreamingComponent } from '../ui/media/StreamingComponent'

interface TwitchStreamingPlayerProps {
  channel: string
}

const TwitchStreamingPlayer: React.FC<TwitchStreamingPlayerProps> = ({ channel }) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) return null

  return (
    <StreamingComponent
      id={`twitch-streaming-player-${channel}`}
      channel={channel}
      variant="player"
      aspectRatio="video"
      rounded
      onError={() => setHasError(true)}
    />
  )
}

export default TwitchStreamingPlayer

import React from 'react'
import { TwitchLive } from 'react-twitch-live-embed'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface TwitchPlayerOptions {
  width?: string | number
  height?: string | number
  autoplay?: boolean
  muted?: boolean
}

interface StreamingComponentProps {
  id: string
  channel: string
  variant?: 'featured' | 'player' | 'thumbnail'
  aspectRatio?: 'video' | 'square' | 'auto'
  rounded?: boolean
  parent?: string | string[] // for Twitch embed parent domain
  className?: string
  playerOptions?: TwitchPlayerOptions
  onError?: () => void
}

/**
 * StreamingComponent - Standardized Twitch stream embed component
 *
 * Provides consistent Twitch player styling with variants for different use cases,
 * using design tokens instead of inline Tailwind classes.
 */
export const StreamingComponent: React.FC<StreamingComponentProps> = ({
  id,
  channel,
  variant = 'player',
  aspectRatio = 'video',
  rounded = true,
  parent,
  className = '',
  playerOptions,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'featured':
        return ''
      case 'player':
        return `${DESIGN_TOKENS.YOUTUBE_CARD_BG} overflow-hidden`
      case 'thumbnail':
        return `${DESIGN_TOKENS.YOUTUBE_CARD_BG} overflow-hidden`
      default:
        return ''
    }
  }

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video'
      case 'square':
        return 'aspect-square'
      case 'auto':
      default:
        return ''
    }
  }

  const getRoundedClasses = () => {
    return rounded ? DESIGN_TOKENS.BORDER_RADIUS : ''
  }

  // Convert parent to array format if it's a string
  const parentArray = parent
    ? Array.isArray(parent)
      ? parent
      : [parent]
    : undefined

  return (
    <div
      id={id}
      className={`${getVariantClasses()} ${getRoundedClasses()} ${className}`}
    >
      <div id={`${id}-aspect`} className={getAspectRatioClasses()}>
        <TwitchLive
          channel={channel}
          width={playerOptions?.width ?? '100%'}
          height={playerOptions?.height ?? '100%'}
          autoplay={playerOptions?.autoplay ?? true}
          muted={playerOptions?.muted ?? false}
          parent={parentArray}
          id={`${id}-twitch-embed`}
        />
      </div>
    </div>
  )
}

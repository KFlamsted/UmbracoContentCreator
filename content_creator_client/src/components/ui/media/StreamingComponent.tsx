import React, { useRef, useEffect } from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface StreamingComponentProps {
  id: string
  channel: string
  variant?: 'featured' | 'player' | 'thumbnail'
  aspectRatio?: 'video' | 'square' | 'auto'
  rounded?: boolean
  parent?: string // for Twitch embed parent domain
  className?: string
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
  onError,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

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

  // Twitch requires the parent domain for security
  const parentDomain = parent || window.location.hostname
  const src = `https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}&autoplay=false`;

  useEffect(() => {
    // Optionally, handle error events
    const iframe = iframeRef.current
    if (!iframe || !onError) return
    const handleError = () => onError()
    iframe.addEventListener('error', handleError)
    return () => {
      iframe.removeEventListener('error', handleError)
    }
  }, [onError])

  return (
    <div
      id={id}
      className={`${getVariantClasses()} ${getRoundedClasses()} ${className}`}
    >
      <div id={`${id}-aspect`} className={getAspectRatioClasses()}>
        <iframe
          ref={iframeRef}
          src={src}
          allowFullScreen
          height="100%"
          width="100%"
          title={`Twitch stream for ${channel}`}
        />
      </div>
    </div>
  )
}

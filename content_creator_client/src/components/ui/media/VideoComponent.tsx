import React from 'react'
import YouTube from 'react-youtube'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface YouTubePlayerOptions {
  width?: string | number
  height?: string | number
  playerVars?: Record<string, unknown>
}

interface VideoComponentProps {
  /**
   * Unique identifier for the video component
   */
  id: string
  /**
   * YouTube video ID
   */
  videoId: string
  /**
   * Video player variant
   */
  variant?: 'featured' | 'player' | 'thumbnail'
  /**
   * Aspect ratio for the video container
   */
  aspectRatio?: 'video' | 'square' | 'auto'
  /**
   * Whether to apply rounded corners
   */
  rounded?: boolean
  /**
   * YouTube player options
   */
  playerOptions?: YouTubePlayerOptions
  /**
   * Error handler for video loading failures
   */
  onError?: () => void
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * VideoComponent - Standardized YouTube video player component
 * 
 * Provides consistent video player styling with variants for different use cases,
 * using design tokens instead of inline Tailwind classes.
 */
export const VideoComponent: React.FC<VideoComponentProps> = ({
  id,
  videoId,
  variant = 'player',
  aspectRatio = 'video',
  rounded = true,
  playerOptions,
  onError,
  className = ''
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

  const defaultPlayerOptions: YouTubePlayerOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  }

  const combinedPlayerOptions = { ...defaultPlayerOptions, ...playerOptions }

  return (
    <div
      id={id}
      className={`${getVariantClasses()} ${getRoundedClasses()} ${className}`}
    >
      <div 
        id={`${id}-aspect`} 
        className={getAspectRatioClasses()}
      >
        <YouTube
          videoId={videoId}
          opts={combinedPlayerOptions}
          onError={onError}
          className="w-full h-full"
        />
      </div>
    </div>
  )
} 
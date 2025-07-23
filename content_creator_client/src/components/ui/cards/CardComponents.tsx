import React from 'react'
import { 
  DESIGN_TOKENS,
  CARD_CLASSES,
  CONTENT_CARD_CLASSES,
  BACKDROP_BLUR_CARD_CLASSES,
  CONTENT_CARD_BACKDROP_BLUR_CLASSES
} from '../../../constants/styles'

// Base Card Props
interface BaseCardProps {
  id: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

// Standard Card Component
interface CardProps extends BaseCardProps {
  variant?: 'default' | 'content' | 'title'
  hasBackdropBlur?: boolean
  interactive?: boolean
}

export const CardComponent: React.FC<CardProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'default',
  hasBackdropBlur = false,
  interactive = false,
  onClick
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'content':
        return hasBackdropBlur ? CONTENT_CARD_BACKDROP_BLUR_CLASSES : CONTENT_CARD_CLASSES
      case 'title':
        return hasBackdropBlur ? `${BACKDROP_BLUR_CARD_CLASSES} mb-2` : `${CARD_CLASSES} mb-2`
      case 'default':
      default:
        return hasBackdropBlur ? BACKDROP_BLUR_CARD_CLASSES : CARD_CLASSES
    }
  }

  const getInteractiveClasses = () => {
    return interactive ? 'cursor-pointer transition-transform hover:scale-105' : ''
  }

  return (
    <div 
      id={id} 
      className={`${getVariantClasses()} ${getInteractiveClasses()} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}

// Image Card Component (like GridItem but more focused)
interface ImageCardProps extends BaseCardProps {
  imageUrl?: string
  imageAlt?: string
  title?: string
  summary?: string
  author?: string
  publishDate?: string
  height?: string
  overlayVariant?: 'dark' | 'light'
}

export const ImageCardComponent: React.FC<ImageCardProps> = ({ 
  id, 
  children,
  className = '', 
  imageUrl,
  imageAlt,
  title,
  summary,
  author,
  publishDate,
  height = 'h-64',
  overlayVariant = 'dark',
  onClick
}) => {
  const getOverlayClasses = () => {
    return overlayVariant === 'light' 
      ? DESIGN_TOKENS.BACKGROUND_OVERLAY_LIGHT 
      : DESIGN_TOKENS.BACKGROUND_OVERLAY_DARK
  }

  return (
    <div 
      id={id}
      className={`${
        onClick ? 'cursor-pointer transition-transform hover:scale-105' : ''
      } ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        id={`${id}-card`}
        className={`relative ${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} overflow-hidden ${height}`}
      >
        {/* Background Image */}
        {imageUrl && (
          <div
            id={`${id}-background`}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="img"
            aria-label={imageAlt ?? title ?? 'Card image'}
          />
        )}
        
        {/* Content Overlay */}
        {(title || summary || author || publishDate || children) && (
          <div 
            id={`${id}-overlay`} 
            className={`absolute inset-0 ${getOverlayClasses()} flex flex-col justify-between p-4`}
          >
            <div id={`${id}-header`}>
              {title && (
                <h3 id={`${id}-title`} className="text-lg font-bold mb-2 text-left text-white">
                  {title}
                </h3>
              )}
              {(author || publishDate) && (
                <div id={`${id}-meta`} className="text-xs opacity-80 mb-2 text-white">
                  {author && <span id={`${id}-author`}>By {author}</span>}
                  {author && publishDate && <span id={`${id}-separator`}> • </span>}
                  {publishDate && <span id={`${id}-date`}>{publishDate}</span>}
                </div>
              )}
            </div>
            
            {children ? (
              <div id={`${id}-children`}>{children}</div>
            ) : (
              summary && (
                <div id={`${id}-summary`} className="text-sm opacity-90 text-left text-white">
                  {summary}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// YouTube Video Card Component
interface YouTubeCardProps extends BaseCardProps {
  thumbnailUrl: string
  title: string
  channelTitle?: string
  publishedAt?: string
  duration?: string
  variant?: 'thumbnail' | 'featured'
}

export const YouTubeCardComponent: React.FC<YouTubeCardProps> = ({ 
  id, 
  children,
  className = '', 
  thumbnailUrl,
  title,
  channelTitle,
  publishedAt,
  duration,
  variant = 'thumbnail',
  onClick
}) => {
  const getCardClasses = () => {
    return variant === 'featured' 
      ? `cursor-pointer relative overflow-hidden ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.YOUTUBE_CARD_BG}`
      : `cursor-pointer relative overflow-hidden ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.YOUTUBE_CARD_BG} flex flex-col h-full`
  }

  return (
    <div 
      id={id}
      className={`group ${getCardClasses()} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail */}
      <div className="relative">
        <img 
          id={`${id}-thumbnail`}
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-auto object-cover"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300">
          <div className={`${DESIGN_TOKENS.YOUTUBE_PLAY_BUTTON_SIZE} ${DESIGN_TOKENS.YOUTUBE_PLAY_BUTTON_BG} rounded-full flex items-center justify-center ${DESIGN_TOKENS.CARD_SHADOW} group-hover:scale-110 transition-transform duration-300`}>
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-3 flex-grow">
        <h3 className={DESIGN_TOKENS.YOUTUBE_VIDEO_TITLE}>
          {title}
        </h3>
        
        {channelTitle && (
          <p className="text-gray-400 text-xs mb-1">
            {channelTitle}
          </p>
        )}
        
        {publishedAt && (
          <p className="text-gray-500 text-xs">
            {publishedAt}
          </p>
        )}
        
        {children}
      </div>
    </div>
  )
}

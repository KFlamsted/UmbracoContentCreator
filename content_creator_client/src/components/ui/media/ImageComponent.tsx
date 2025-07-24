import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface ImageComponentProps {
  /**
   * Unique identifier for the image component
   */
  id: string
  /**
   * Image source URL
   */
  src: string
  /**
   * Alternative text for accessibility
   */
  alt: string
  /**
   * How the image should fit within its container
   */
  variant?: 'cover' | 'contain' | 'auto'
  /**
   * Aspect ratio constraint for the image
   */
  aspectRatio?: 'square' | 'video' | 'auto'
  /**
   * Whether to apply rounded corners
   */
  rounded?: boolean
  /**
   * Custom CSS properties for additional styling
   */
  style?: React.CSSProperties
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Loading strategy for the image
   */
  loading?: 'lazy' | 'eager'
  /**
   * Click handler for interactive images
   */
  onClick?: () => void
}

/**
 * ImageComponent - Standardized image display component
 * 
 * Provides consistent image styling with variants for different use cases,
 * using design tokens instead of inline Tailwind classes.
 */
export const ImageComponent: React.FC<ImageComponentProps> = ({
  id,
  src,
  alt,
  variant = 'auto',
  aspectRatio = 'auto',
  rounded = true,
  style,
  className = '',
  loading = 'lazy',
  onClick
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'cover':
        return 'object-cover'
      case 'contain':
        return 'object-contain'
      case 'auto':
      default:
        return 'object-cover'
    }
  }

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square'
      case 'video':
        return 'aspect-video'
      case 'auto':
      default:
        return ''
    }
  }

  const getRoundedClasses = () => {
    return rounded ? DESIGN_TOKENS.BORDER_RADIUS : ''
  }

  const getInteractiveClasses = () => {
    return onClick ? 'cursor-pointer transition-transform hover:scale-105' : ''
  }

  const combinedStyle = {
    maxHeight: '400px',
    ...style
  }

  return (
    <img
      id={id}
      src={src}
      alt={alt}
      loading={loading}
      style={combinedStyle}
      className={`w-full h-auto ${getVariantClasses()} ${getAspectRatioClasses()} ${getRoundedClasses()} ${getInteractiveClasses()} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    />
  )
} 
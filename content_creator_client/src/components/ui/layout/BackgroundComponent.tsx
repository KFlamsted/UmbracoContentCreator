import React from 'react'

interface BackgroundComponentProps {
  /**
   * Unique identifier for the background component
   */
  id: string
  /**
   * Background image URL
   */
  imageUrl?: string
  /**
   * Background variant
   */
  variant?: 'sharp' | 'blurred'
  /**
   * Z-index layer
   */
  zIndex?: 'background' | 'overlay' | 'content'
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * BackgroundComponent - Standardized background image component
 * 
 * Handles background images with variants for sharp/blurred and proper z-index layering.
 * Uses design tokens instead of inline Tailwind classes.
 */
export const BackgroundComponent: React.FC<BackgroundComponentProps> = ({
  id,
  imageUrl,
  variant = 'sharp',
  zIndex = 'background',
  className = ''
}) => {
  if (!imageUrl) {
    return null
  }

  const getVariantClasses = () => {
    const baseClasses = 'fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat'
    
    switch (variant) {
      case 'blurred':
        return `${baseClasses} blur-sm`
      case 'sharp':
      default:
        return baseClasses
    }
  }

  const getZIndexClasses = () => {
    switch (zIndex) {
      case 'background':
        return 'z-0'
      case 'overlay':
        return 'z-10'
      case 'content':
        return 'z-20'
      default:
        return 'z-0'
    }
  }

  return (
    <div
      id={id}
      className={`${getVariantClasses()} ${getZIndexClasses()} ${className}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  )
} 
import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface AppContainerComponentProps {
  /**
   * Unique identifier for the app container component
   */
  id: string
  /**
   * Content to render in the container
   */
  children: React.ReactNode
  /**
   * Container variant
   */
  variant?: 'homepage' | 'page' | 'page-with-nav'
  /**
   * Whether the page has a background image
   */
  hasBackgroundImage?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * AppContainerComponent - App-level container component
 * 
 * Handles the main app container styling with variants for different page types.
 * Replaces the getAppShellContainerClasses function with proper component abstraction.
 */
export const AppContainerComponent: React.FC<AppContainerComponentProps> = ({
  id,
  children,
  variant = 'page',
  hasBackgroundImage = false,
  className = ''
}) => {
  const getVariantClasses = () => {
    const baseClasses = 'min-h-screen flex flex-col items-center justify-start'
    const backgroundClass = hasBackgroundImage ? '' : DESIGN_TOKENS.MUTED_BG
    const paddingClasses = `${DESIGN_TOKENS.SECTION_PADDING_X} ${DESIGN_TOKENS.SECTION_PADDING_Y}`
    
    switch (variant) {
      case 'homepage':
        return 'w-full'
      case 'page-with-nav':
        return `${baseClasses} ${backgroundClass} ${paddingClasses} pt-32`
      case 'page':
      default:
        return `${baseClasses} ${backgroundClass} ${paddingClasses} pt-20`
    }
  }

  return (
    <div
      id={id}
      className={`${getVariantClasses()} ${className}`}
    >
      {children}
    </div>
  )
} 
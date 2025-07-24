import React from 'react'
import { CardComponent } from '../ui'

interface ContentCardProps {
  /**
   * Unique identifier for the content card
   */
  id: string
  /**
   * Content sections to display within the card
   */
  children: React.ReactNode
  /**
   * Whether this card is displayed on a page with a background image (enables backdrop blur)
   */
  hasBackgroundImage?: boolean
}

/**
 * ContentCard - Main content wrapper component that replaces individual cards
 * 
 * This component provides a single large card that contains multiple content sections.
 * It handles backdrop blur based on whether the page has a background image.
 */
const ContentCard: React.FC<ContentCardProps> = ({
  id,
  children,
  hasBackgroundImage = false,
}) => {
  return (
    <CardComponent 
      id={id} 
      variant="content" 
      hasBackdropBlur={hasBackgroundImage}
    >
      {children}
    </CardComponent>
  )
}

export default ContentCard 
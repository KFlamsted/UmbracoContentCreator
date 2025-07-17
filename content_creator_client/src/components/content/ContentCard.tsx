import { CONTENT_CARD_CLASSES, CONTENT_CARD_BACKDROP_BLUR_CLASSES } from '../../constants/styles'

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
  const cardClasses = hasBackgroundImage 
    ? CONTENT_CARD_BACKDROP_BLUR_CLASSES 
    : CONTENT_CARD_CLASSES

  return (
    <div id={id} className={cardClasses}>
      {children}
    </div>
  )
}

export default ContentCard 
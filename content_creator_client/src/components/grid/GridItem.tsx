import React from 'react'
import { ImageCardComponent, BadgeComponent, AbsoluteTopRightComponent, OverlayRichTextComponent } from '../ui'

export interface GridItemProps {
  /** Title to display on the card */
  title?: string
  /** Summary/description text or React content */
  summary?: string | React.ReactNode
  /** Image URL for the background */
  imageUrl?: string
  /** Alt text for the image */
  imageAlt?: string
  /** Whether this item is featured */
  featured?: boolean
  /** Author name */
  author?: string
  /** Publish date */
  publishDate?: string
  /** Badge text to display (defaults to "Featured" when featured is true) */
  badgeText?: string
  /** Custom className for additional styling */
  className?: string
  /** Click handler for the entire card */
  onClick?: () => void
  /** Height of the card (defaults to h-64) */
  height?: string
  /** Optional children to render instead of default content */
  children?: React.ReactNode
}

const GridItem: React.FC<GridItemProps> = ({
  title,
  summary,
  imageUrl,
  imageAlt,
  featured,
  author,
  publishDate,
  badgeText,
  className = '',
  onClick,
  height = 'h-64',
  children
}) => {
  // Generate prefixId from title like the original component
  const prefixId = title?.toLowerCase().replace(/\s+/g, '-')
  const displayBadgeText = badgeText ?? (featured ? 'Featured' : undefined)

  // If using the ImageCardComponent, we can simplify the structure significantly
  return (
    <ImageCardComponent
      id={`grid-item-${prefixId ?? 'item'}`}
      className={className}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      title={title}
      summary={typeof summary === 'string' ? summary : undefined}
      author={author}
      publishDate={publishDate}
      height={height}
      onClick={onClick}
      overlayVariant="dark"
    >
      {/* Custom content area */}
      {displayBadgeText && (
        <AbsoluteTopRightComponent id={`grid-item-${prefixId ?? 'item'}-badge-container`} spacing="default">
          <BadgeComponent
            id={`grid-item-${prefixId ?? 'item'}-badge`}
            variant="primary"
            size="default"
          >
            {displayBadgeText}
          </BadgeComponent>
        </AbsoluteTopRightComponent>
      )}
      
      {/* Render custom children if provided and summary is not a string */}
      {children && (
        <OverlayRichTextComponent id={`grid-item-${prefixId ?? 'item'}-children`}>
          {children}
        </OverlayRichTextComponent>
      )}
      
      {/* Render React node summary if it's not a string */}
      {typeof summary !== 'string' && summary && (
        <OverlayRichTextComponent id={`grid-item-${prefixId ?? 'item'}-summary-content`}>
          {summary}
        </OverlayRichTextComponent>
      )}
    </ImageCardComponent>
  )
}

export default GridItem

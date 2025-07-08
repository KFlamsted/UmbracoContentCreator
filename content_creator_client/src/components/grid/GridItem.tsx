import React from 'react'
import { DESIGN_TOKENS } from '../../constants/styles'

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

/**
 * A reusable grid item component that displays content as a card with:
 * - Background image
 * - Overlay with title and summary
 * - Optional featured badge
 * - Click handling
 * - Hover effects
 *
 * @example
 * ```tsx
 * <GridItem
 *   title="News Article Title"
 *   summary="Brief description of the article"
 *   imageUrl="/images/article.jpg"
 *   featured={true}
 *   onClick={() => navigate('/article/123')}
 * />
 * ```
 */
const GridItem: React.FC<GridItemProps> = ({
  title,
  summary,
  imageUrl,
  imageAlt,
  author,
  publishDate,
  className = '',
  onClick,
  height = 'h-64',
  children,
}) => {
  return (
    <div
      id={`grid-item-${title?.toLowerCase().replace(/\s+/g, '-') || 'item'}`}
      className={`${
        onClick ? 'cursor-pointer transition-transform hover:scale-105' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div
        id={`grid-item-card-${title?.toLowerCase().replace(/\s+/g, '-') || 'card'}`}
        className={`relative ${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} overflow-hidden ${height}`}
      >
        {/* Background Image */}
        {imageUrl && (
          <div
            id={`grid-item-background-${title?.toLowerCase().replace(/\s+/g, '-') || 'bg'}`}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="img"
            aria-label={imageAlt || title || 'Grid item image'}
          />
        )}
        {/* Content Overlay */}
        {(title || summary || author || publishDate || children) && (
          <div id={`grid-item-overlay-${title?.toLowerCase().replace(/\s+/g, '-') || 'overlay'}`} className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
            <div id={`grid-item-header-${title?.toLowerCase().replace(/\s+/g, '-') || 'header'}`}>
              {title && <h3 id={`grid-item-title-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-lg font-bold mb-2 text-left">{title}</h3>}
              {(author || publishDate) && (
                <div id={`grid-item-meta-${title?.toLowerCase().replace(/\s+/g, '-') || 'meta'}`} className="text-xs opacity-80 mb-2">
                  {author && <span id={`grid-item-author-${title?.toLowerCase().replace(/\s+/g, '-') || 'author'}`}>By {author}</span>}
                  {author && publishDate && <span id={`grid-item-separator-${title?.toLowerCase().replace(/\s+/g, '-') || 'sep'}`}> • </span>}
                  {publishDate && <span id={`grid-item-date-${title?.toLowerCase().replace(/\s+/g, '-') || 'date'}`}>{publishDate}</span>}
                </div>
              )}
            </div>
            {children ? (
              <div id={`grid-item-children-${title?.toLowerCase().replace(/\s+/g, '-') || 'children'}`}>{children}</div>
            ) : (
              summary && <div id={`grid-item-summary-${title?.toLowerCase().replace(/\s+/g, '-') || 'summary'}`} className="text-sm opacity-90 text-left">{summary}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default GridItem

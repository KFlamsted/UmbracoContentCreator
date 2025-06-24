import React from 'react'
import { CARD_CLASSES, DESIGN_TOKENS } from '../../constants/styles'

export interface GridCardComponentProps<T> {
  /** Array of items to display in the grid */
  items: T[]
  /** Maximum number of items to display (optional) */
  maxItems?: number  /** Number of columns in the grid (2, 3, 4, or '1-md-2' for responsive 1→2) */
  columns?: 2 | 3 | 4 | '1-md-2'
  /** Function that renders each item */
  renderItem: (item: T, index: number) => React.ReactNode
  /** Function that generates a unique key for each item */
  getItemKey: (item: T, index: number) => string | number
  /** Message to display when no items are available */
  emptyMessage?: string
  /** Additional CSS classes to apply to the container */
  className?: string
}

/**
 * A reusable grid card component that displays items in a responsive grid layout.
 * Supports 2, 3, or 4 columns and handles empty states gracefully.
 * 
 * @example
 * ```tsx
 * <GridCardComponent
 *   items={newsItems}
 *   maxItems={6}
 *   columns={3}
 *   renderItem={(item) => <NewsCard item={item} />}
 *   getItemKey={(item) => item.id}
 *   emptyMessage="No news available"
 * />
 * ```
 */
const GridCardComponent = <T,>({
  items,
  maxItems,
  columns = 3,
  renderItem,
  getItemKey,
  emptyMessage = 'No items available',
  className,
}: GridCardComponentProps<T>) => {
  // Limit the number of items to display
  const itemsToShow = maxItems ? items.slice(0, maxItems) : items
  // Generate grid columns class based on the columns prop
  const getGridColumnsClass = (cols: 2 | 3 | 4 | '1-md-2') => {
    switch (cols) {
      case '1-md-2':
        return DESIGN_TOKENS.GRID_COLS_1_MD_2
      case 2:
        return DESIGN_TOKENS.GRID_COLS_2
      case 3:
        return DESIGN_TOKENS.GRID_COLS_3
      case 4:
        return DESIGN_TOKENS.GRID_COLS_4
      default:
        return DESIGN_TOKENS.GRID_COLS_3
    }
  }

  if (itemsToShow.length === 0) {
    return (
      <div className={`${CARD_CLASSES} text-center ${className || ''}`}>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`${CARD_CLASSES} ${className || ''}`}>
      <div className={`grid ${getGridColumnsClass(columns)} gap-4`}>
        {itemsToShow.map((item, index) => (
          <React.Fragment key={getItemKey(item, index)}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default GridCardComponent

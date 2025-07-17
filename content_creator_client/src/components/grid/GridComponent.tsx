import React from 'react'
import { DESIGN_TOKENS } from '../../constants/styles'

export interface GridComponentProps<T> {
  /** Unique identifier for the grid component */
  id: string
  /** Array of items to display in the grid */
  items: T[]
  /** Maximum number of items to display (optional) */
  maxItems?: number
  /** Number of columns in the grid (2, 3, 4, '1-md-2' for responsive 1→2, or '1-md-2-lg-3' for responsive 1→2→3) */
  columns?: 2 | 3 | 4 | '1-md-2' | '1-md-2-lg-3'
  /** Function that renders each item */
  renderItem: (item: T, index: number) => React.ReactNode
  /** Function that generates a unique key for each item */
  getItemKey: (item: T, index: number) => string | number
  /** Additional CSS classes to apply to the container */
  className?: string
  /** Whether to make all grid items equal height */
  equalHeight?: boolean
}

/**
 * A reusable grid component that displays items in a responsive grid layout.
 * Supports 2, 3, or 4 columns and handles empty states gracefully.
 * 
 * @example
 * ```tsx
 * <GridComponent
 *   items={newsItems}
 *   maxItems={6}
 *   columns={3}
 *   renderItem={(item) => <NewsCard item={item} />}
 *   getItemKey={(item) => item.id}
 * />
 * ```
 */
const GridComponent = <T,>({
  id,
  items,
  maxItems,
  columns = 3,
  renderItem,
  getItemKey,
  className,
  equalHeight = false,
}: GridComponentProps<T>) => {
  // Limit the number of items to display
  const itemsToShow = maxItems ? items.slice(0, maxItems) : items
  
  // Generate grid columns class based on the columns prop
  const getGridColumnsClass = (cols: 2 | 3 | 4 | '1-md-2' | '1-md-2-lg-3') => {
    switch (cols) {
      case '1-md-2':
        return DESIGN_TOKENS.GRID_COLS_1_MD_2
      case '1-md-2-lg-3':
        return DESIGN_TOKENS.GRID_COLS_1_MD_2_LG_3
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

  // Build grid classes with optional equal height
  const gridClasses = `grid ${getGridColumnsClass(columns)} gap-4 ${
    equalHeight ? 'items-stretch' : ''
  }`

  return (
    <div id={id} className={`w-full ${className ?? ''}`}>
      <div id={`${id}-container`} className={gridClasses}>
        {itemsToShow.map((item, index) => (
          <React.Fragment key={getItemKey(item, index)}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default GridComponent 
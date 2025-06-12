import type { NewsItemPage } from '../../model/NewsItemPage'
import MinimizedNewsItemPageContainer from './MinimizedNewsItemPageContainer'
import { CARD_CLASSES, DESIGN_TOKENS } from '../../constants/styles'

interface MinimizedNewsItemPageListContainerProps {
  newsItems: NewsItemPage[]
  maxItems?: number
}

const MinimizedNewsItemPageListContainer: React.FC<MinimizedNewsItemPageListContainerProps> = ({
  newsItems,
  maxItems,
}) => {
  // Limit the number of items to display
  const itemsToShow = maxItems ? newsItems.slice(0, maxItems) : newsItems

  if (itemsToShow.length === 0) {
    return (
      <div className={`${CARD_CLASSES} text-center`}>
        <p className="text-gray-500">No news items available</p>
      </div>
    )
  }
  return (
    <div className={CARD_CLASSES}>      <div className={`grid ${DESIGN_TOKENS.GRID_COLS_3} gap-4`}>
        {itemsToShow.map((newsItem, index) => (
          <MinimizedNewsItemPageContainer 
            key={newsItem.id || newsItem.title || index}
            newsItem={newsItem}
          />
        ))}
      </div>
    </div>
  )
}

export default MinimizedNewsItemPageListContainer

import type { NewsItemPage } from '../../model/NewsItemPage'
import MinimizedNewsItemPageContainer from './MinimizedNewsItemPageContainer'
import { GridComponent } from '../../components/grid'
import { DESIGN_TOKENS, SECTION_SPACING } from '../../constants/styles'

interface MinimizedNewsItemPageListContainerProps {
  newsItems: NewsItemPage[]
  maxItems?: number
}

const MinimizedNewsItemPageListContainer: React.FC<
  MinimizedNewsItemPageListContainerProps
> = ({ newsItems, maxItems }) => {
  const minimizedListContainerId = 'minimized-news-item-page-list-container'
  return (
    <div
      id={minimizedListContainerId}
      className={`w-full ${DESIGN_TOKENS.CONTAINER_MAX_WIDTH} ${SECTION_SPACING}`}
    >
      <GridComponent
        id={`${minimizedListContainerId}-grid`}
        items={newsItems}
        maxItems={maxItems}
        columns="1-md-2"
        renderItem={(newsItem) => (
          <MinimizedNewsItemPageContainer newsItem={newsItem} />
        )}
        getItemKey={(newsItem, index) => newsItem.id || newsItem.title || index}
      />
    </div>
  )
}

export default MinimizedNewsItemPageListContainer

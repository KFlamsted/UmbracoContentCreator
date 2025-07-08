import type { NewsItemPage } from '../../model/NewsItemPage'
import MinimizedNewsItemPageContainer from './MinimizedNewsItemPageContainer'
import { GridCardComponent } from '../../components/grid'

interface MinimizedNewsItemPageListContainerProps {
  newsItems: NewsItemPage[]
  maxItems?: number
}

const MinimizedNewsItemPageListContainer: React.FC<MinimizedNewsItemPageListContainerProps> = ({
  newsItems,
  maxItems,
}) => {  return (
    <div id="minimized-news-item-page-list-container">
      <GridCardComponent
        items={newsItems}
        maxItems={maxItems}
        columns="1-md-2"
        renderItem={(newsItem) => (
          <MinimizedNewsItemPageContainer 
            newsItem={newsItem}
          />
        )}
        getItemKey={(newsItem, index) => newsItem.id || newsItem.title || index}
      />
    </div>
  )
}

export default MinimizedNewsItemPageListContainer

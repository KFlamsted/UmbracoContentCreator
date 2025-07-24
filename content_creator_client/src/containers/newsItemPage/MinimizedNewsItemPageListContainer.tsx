import type { NewsItemPage } from '../../model/NewsItemPage'
import MinimizedNewsItemPageContainer from './MinimizedNewsItemPageContainer'
import { GridComponent } from '../../components/grid'
import { SectionComponent } from '../../components/ui'

interface MinimizedNewsItemPageListContainerProps {
  newsItems: NewsItemPage[]
  maxItems?: number
}

const MinimizedNewsItemPageListContainer: React.FC<
  MinimizedNewsItemPageListContainerProps
> = ({ newsItems, maxItems }) => {
  const minimizedListContainerId = 'minimized-news-item-page-list-container'
  
  return (
    <SectionComponent 
      id={minimizedListContainerId} 
      variant="card-section" 
      spacing="default"
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
    </SectionComponent>
  )
}

export default MinimizedNewsItemPageListContainer

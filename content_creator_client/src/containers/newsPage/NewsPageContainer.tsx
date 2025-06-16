import { useEffect } from 'react'
import { useNewsPage, useNewsPageItems } from '../../hooks/PageLoadHooks'
import PageTitleCard from '../../components/content/PageTitleCard'
import BodyTextCard from '../../components/content/BodyTextCard'
import MainImageCard from '../../components/content/MainImageCard'
import MinimizedNewsItemPageListContainer from '../newsItemPage/MinimizedNewsItemPageListContainer'

interface NewsPageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const NewsPageContainer: React.FC<NewsPageContainerProps> = ({
  onStateChange,
}) => {
  const { content, loading, error } = useNewsPage()
  
  // Use the actual news page ID to fetch children
  const { newsItems, loading: newsItemsLoading, error: newsItemsError } = useNewsPageItems(
    content.id, // Use the actual parent ID from news content
    content.newsPerPage || 10
  )

  useEffect(() => {
    onStateChange?.(loading || newsItemsLoading, error || newsItemsError)
  }, [loading, newsItemsLoading, error, newsItemsError, onStateChange])

  useEffect(() => {
    if (newsItems.length > 0) {
      console.log('Fetched NewsPageItems:', newsItems)
    }
  }, [newsItems])
  return (
    <>
      <PageTitleCard title={content.title} />
      <MainImageCard mainImage={content.mainImage} alt={content.title} />
      <BodyTextCard bodyText={content.description?.markup} />
      <MinimizedNewsItemPageListContainer 
        newsItems={newsItems}
        maxItems={content.newsPerPage ?? 9}
      />
    </>
  )
}

export default NewsPageContainer

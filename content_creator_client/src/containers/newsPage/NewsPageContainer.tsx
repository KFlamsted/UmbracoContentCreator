import { useEffect } from 'react'
import { useNewsPage, useNewsPageItems } from '../../hooks/PageLoadHooks'
import PageTitleCard from '../../components/content/PageTitleCard'
import BodyTextCard from '../../components/content/BodyTextCard'
import MainImageCard from '../../components/content/MainImageCard'
import MinimizedNewsItemPageListContainer from '../newsItemPage/MinimizedNewsItemPageListContainer'
import { NEWS_PAGE_CONTAINER_CLASSES } from '../../constants/styles'

interface NewsPageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const NewsPageContainer: React.FC<NewsPageContainerProps> = ({
  onStateChange,
}) => {
  const { content, loading, error } = useNewsPage()

  // Use the actual news page ID to fetch children
  const {
    newsItems,
    loading: newsItemsLoading,
    error: newsItemsError,
  } = useNewsPageItems(
    content.id, // Use the actual parent ID from news content
    content.newsPerPage || 10
  )

  useEffect(() => {
    onStateChange?.(loading || newsItemsLoading, error || newsItemsError)
  }, [loading, newsItemsLoading, error, newsItemsError, onStateChange])

  return (
    <div id="news-page-container" className={NEWS_PAGE_CONTAINER_CLASSES}>
      <PageTitleCard title={content.title} isNewsPage={true} />
      <MainImageCard
        mainImage={content.mainImage}
        alt={content.title}
        isNewsPage={true}
      />
      <BodyTextCard bodyText={content.description?.markup} hasBackgroundImage />
      <MinimizedNewsItemPageListContainer
        newsItems={newsItems}
        maxItems={content.newsPerPage ?? 9}
      />
    </div>
  )
}

export default NewsPageContainer

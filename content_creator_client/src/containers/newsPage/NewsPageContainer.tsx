import { useEffect } from 'react'
import { useNewsPage, useNewsPageItems } from '../../hooks/PageLoadHooks'
import ContentCard from '../../components/content/ContentCard'
import PageTitleSection from '../../components/content/PageTitleSection'
import BodyTextSection from '../../components/content/BodyTextSection'
import MainImageSection from '../../components/content/MainImageSection'
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
      <ContentCard
        id="news-page-content-card"
        hasBackgroundImage={true}
      >
        <PageTitleSection 
          id="news-page-title-section"
          title={content.title} 
        />
        <MainImageSection
          id="news-page-main-image-section"
          mainImage={content.mainImage}
          alt={content.title}
        />
        <BodyTextSection 
          id="news-page-body-text-section"
          bodyText={content.description?.markup} 
        />
      </ContentCard>
      <MinimizedNewsItemPageListContainer
        newsItems={newsItems}
        maxItems={content.newsPerPage ?? 9}
      />
    </div>
  )
}

export default NewsPageContainer

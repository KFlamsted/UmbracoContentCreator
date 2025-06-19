import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNewsItemPage } from '../../hooks/PageLoadHooks'
import PageTitleCard from '../../components/content/PageTitleCard'
import BodyTextCard from '../../components/content/BodyTextCard'
import MainImageCard from '../../components/content/MainImageCard'
import { NEWS_PAGE_CONTAINER_CLASSES } from '../../constants/styles'

interface NewsItemPageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const NewsItemPageContainer: React.FC<NewsItemPageContainerProps> = ({
  onStateChange,
}) => {
  const { itemPage } = useParams<{ itemPage: string }>()
  const { content, loading, error } = useNewsItemPage(itemPage)
  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])

  return (
    <div className={NEWS_PAGE_CONTAINER_CLASSES}>
      <PageTitleCard title={content.title} isNewsPage={true} />
      <MainImageCard mainImage={content.mainImage} alt={content.title} isNewsPage={true} />
      <BodyTextCard bodyText={content.bodyText?.markup} isNewsPage={true} />
    </div>
  )
}

export default NewsItemPageContainer

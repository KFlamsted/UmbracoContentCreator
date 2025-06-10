import { useEffect } from 'react'
import { useNewsPage } from '../../hooks/PageLoadHooks'
import PageTitleCard from '../../components/content/PageTitleCard'
import BodyTextCard from '../../components/content/BodyTextCard'
import MainImageCard from '../../components/content/MainImageCard'

interface NewsPageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const NewsPageContainer: React.FC<NewsPageContainerProps> = ({
  onStateChange,
}) => {
  const { content, loading, error } = useNewsPage()

  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])

  return (
    <>
      <PageTitleCard title={content.title} />
      <MainImageCard mainImage={content.mainImage} alt={content.title} />
      <BodyTextCard bodyText={content.description?.markup} />
    </>
  )
}

export default NewsPageContainer

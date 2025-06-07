import { useEffect } from 'react'
import { useNewsPage } from '../../hooks/PageLoadHooks'
import PageTitleCard from '../../components/content/PageTitleCard'
import BodyTextCard from '../../components/content/BodyTextCard'

interface NewsPageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const NewsPageContainer: React.FC<NewsPageContainerProps> = ({ onStateChange }) => {
  const { content, loading, error } = useNewsPage()

  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])

  return (
    <>
      <PageTitleCard title={content.title} />
      <BodyTextCard bodyText={content.description?.markup} />
    </>
  )
}

export default NewsPageContainer

import { useEffect } from 'react'
import { useHomePage } from '../../hooks/useHomePage'
import PageTitleCard from '../../components/content/PageTitleCard'
import BodyTextCard from '../../components/content/BodyTextCard'

interface HomePageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const HomePageContainer: React.FC<HomePageContainerProps> = ({ onStateChange }) => {
  const { content, loading, error } = useHomePage()

  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])

  return (
    <>
      <PageTitleCard title={content.pageTitle} />
      <BodyTextCard bodyText={content.bodyText} />
    </>
  )
}

export default HomePageContainer

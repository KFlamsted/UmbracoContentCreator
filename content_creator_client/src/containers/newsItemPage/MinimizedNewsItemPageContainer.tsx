import { useNavigate } from 'react-router-dom'
import type { NewsItemPage } from '../../model/NewsItemPage'
import { ROUTES } from '../../constants/routes'
import { GridItem } from '../../components/grid'

interface MinimizedNewsItemPageContainerProps {
  newsItem: NewsItemPage
}

const MinimizedNewsItemPageContainer: React.FC<MinimizedNewsItemPageContainerProps> = ({
  newsItem,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    // Generate URL with the news item identifier (prefer ID, fallback to title slug)
    const itemSlug = newsItem.id || 
      newsItem.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 
      'untitled'
    const itemUrl = ROUTES.NEWS_ITEM.replace(':itemPage', itemSlug)
    navigate(itemUrl)
  }

  return (
    <GridItem
      title={newsItem.title}
      summary={newsItem.summary}
      imageUrl={newsItem.mainImage?.url}
      imageAlt={newsItem.title}
      featured={newsItem.featured}
      onClick={handleClick}
    />
  )
}

export default MinimizedNewsItemPageContainer

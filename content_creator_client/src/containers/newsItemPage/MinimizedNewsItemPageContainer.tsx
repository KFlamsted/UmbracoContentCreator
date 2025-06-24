import type { NewsItemPage } from '../../model/NewsItemPage'
import { GridItem } from '../../components/grid'
import { formatDate } from '../../utility/dateUtility'
import parse from 'html-react-parser'

interface MinimizedNewsItemPageContainerProps {
  newsItem: NewsItemPage
}

const MinimizedNewsItemPageContainer: React.FC<MinimizedNewsItemPageContainerProps> = ({
  newsItem,
}) => {
  return (
    <GridItem
      title={newsItem.title}
      summary={newsItem.bodyText?.markup ? parse(newsItem.bodyText.markup) : undefined}
      imageUrl={newsItem.mainImage?.url}
      imageAlt={newsItem.title}
      featured={newsItem.featured}
      author={newsItem.author?.name}
      publishDate={formatDate(newsItem.publishDate)}
    />
  )
}

export default MinimizedNewsItemPageContainer
// 
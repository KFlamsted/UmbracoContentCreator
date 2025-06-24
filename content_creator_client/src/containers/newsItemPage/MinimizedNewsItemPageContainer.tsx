import type { NewsItemPage } from '../../model/NewsItemPage'
import { GridItem } from '../../components/grid'

interface MinimizedNewsItemPageContainerProps {
  newsItem: NewsItemPage
}

const MinimizedNewsItemPageContainer: React.FC<MinimizedNewsItemPageContainerProps> = ({
  newsItem,
}) => {  // Helper function to strip HTML tags
  const getPreviewText = (bodyText?: { markup: string }) => {
    if (!bodyText?.markup) return undefined
    
    // Strip HTML tags and decode entities
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = bodyText.markup
    const textContent = tempDiv.textContent || tempDiv.innerText || ''
    
    return textContent
  }

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return undefined
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('da-DK', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    } catch {
      return dateString
    }
  }

  return (
    <GridItem
      title={newsItem.title}
      summary={getPreviewText(newsItem.bodyText)}
      imageUrl={newsItem.mainImage?.url}
      imageAlt={newsItem.title}
      featured={newsItem.featured}
      author={newsItem.author?.name}
      publishDate={formatDate(newsItem.publishDate)}
      // Remove onClick to make it non-clickable
    />
  )
}

export default MinimizedNewsItemPageContainer
// 
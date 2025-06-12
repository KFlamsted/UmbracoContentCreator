import { useNavigate } from 'react-router-dom'
import type { NewsItemPage } from '../../model/NewsItemPage'
import { ROUTES } from '../../constants/routes'
import { DESIGN_TOKENS } from '../../constants/styles'

interface MinimizedNewsItemPageContainerProps {
  newsItem: NewsItemPage
}

const MinimizedNewsItemPageContainer: React.FC<MinimizedNewsItemPageContainerProps> = ({
  newsItem,
}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    // Generate URL with the news item identifier (prefer ID, fallback to title slug)
    // TODO: Make this a readable ID based on path
    const itemSlug = newsItem.id || 
      newsItem.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 
      'untitled'
    const itemUrl = ROUTES.NEWS_ITEM.replace(':itemPage', itemSlug)
    navigate(itemUrl)
  }
  return (
    <div 
      className="cursor-pointer transition-transform hover:scale-105"
      onClick={handleClick}
    >
      <div className={`relative ${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} overflow-hidden h-64`}>
        {/* Thumbnail Image */}
        {newsItem.mainImage?.url && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${newsItem.mainImage.url})` }}
          />
        )}
        
        {/* Overlay with content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
          <div className="text-white">
            <h3 className="text-lg font-bold mb-2 line-clamp-2">
              {newsItem.title}
            </h3>
            {newsItem.summary && (
              <p className="text-sm opacity-90 line-clamp-3">
                {newsItem.summary}
              </p>
            )}
          </div>
        </div>
        
        {/* Featured badge */}
        {newsItem.featured && (
          <div className={`absolute top-2 right-2 ${DESIGN_TOKENS.PRIMARY_BG} text-white px-2 py-1 rounded text-xs font-semibold`}>
            Featured
          </div>
        )}
      </div>
    </div>
  )
}

export default MinimizedNewsItemPageContainer

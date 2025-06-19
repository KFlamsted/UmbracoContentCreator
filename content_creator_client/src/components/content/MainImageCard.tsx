import { CARD_CLASSES } from '../../constants/styles'
import type { ImageCropperValue } from '../../model/common/ImageCropperValue'

// Create image card classes that include backdrop blur
const NEWS_PAGE_IMAGE_CARD_CLASSES = `${CARD_CLASSES} backdrop-blur-sm`

interface MainImageCardProps {
  mainImage?: ImageCropperValue
  alt?: string
  isNewsPage?: boolean
}

const MainImageCard: React.FC<MainImageCardProps> = ({ mainImage, alt = 'Main image', isNewsPage = false }) => {
  if (!mainImage?.url) {
    return null
  }

  const cardClasses = isNewsPage ? NEWS_PAGE_IMAGE_CARD_CLASSES : CARD_CLASSES

  // Construct full image URL using API base URL + relative path
  const apiUrl = import.meta.env.VITE_API_URL
  const fullImageUrl = `${apiUrl}${mainImage.url}`
  return (
    <div className={cardClasses}>
      <img 
        src={fullImageUrl} 
        alt={alt}
        className="w-full h-auto object-cover rounded-lg"
        style={{ 
          aspectRatio: 'auto',
          maxHeight: '400px',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}

export default MainImageCard

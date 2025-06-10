import { CARD_CLASSES } from '../../constants/styles'
import type { ImageCropperValue } from '../../model/common/ImageCropperValue'

interface MainImageCardProps {
  mainImage?: ImageCropperValue
  alt?: string
}

const MainImageCard: React.FC<MainImageCardProps> = ({ mainImage, alt = 'Main image' }) => {
  if (!mainImage?.url) {
    return null
  }

  // Construct full image URL using API base URL + relative path
  const apiUrl = import.meta.env.VITE_API_URL
  const fullImageUrl = `${apiUrl}${mainImage.url}`

  return (
    <div className={CARD_CLASSES}>
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

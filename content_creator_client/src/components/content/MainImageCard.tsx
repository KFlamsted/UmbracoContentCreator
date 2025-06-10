import { CARD_CLASSES } from '../../styles/constants'
import type { ImageCropperValue } from '../../model/common/ImageCropperValue'

interface MainImageCardProps {
  mainImage?: ImageCropperValue
  alt?: string
}

const MainImageCard: React.FC<MainImageCardProps> = ({ mainImage, alt = 'Main image' }) => {
  if (!mainImage?.src) {
    return null
  }

  return (
    <div className={CARD_CLASSES}>
      <img 
        src={mainImage.src} 
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

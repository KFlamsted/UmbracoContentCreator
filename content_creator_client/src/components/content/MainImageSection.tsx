import { SECTION_SPACING } from '../../constants/styles'
import type { ImageCropperValue } from '../../model/common/ImageCropperValue'

interface MainImageSectionProps {
  /**
   * Unique identifier for the main image section
   */
  id: string
  mainImage?: ImageCropperValue
  alt?: string
}

const MainImageSection: React.FC<MainImageSectionProps> = ({
  id,
  mainImage,
  alt = 'Main image',
}) => {
  if (!mainImage?.url) {
    return null
  }

  // Construct full image URL using API base URL + relative path
  const apiUrl = import.meta.env.VITE_API_URL
  const fullImageUrl = `${apiUrl}${mainImage.url}`
  
  return (
    <div id={id} className={SECTION_SPACING}>
      <img
        id={`${id}-image`}
        src={fullImageUrl}
        alt={alt}
        className="w-full h-auto object-cover rounded-lg"
        style={{
          aspectRatio: 'auto',
          maxHeight: '400px',
          objectFit: 'cover',
        }}
      />
    </div>
  )
}

export default MainImageSection 
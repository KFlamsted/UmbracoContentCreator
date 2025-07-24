import React from 'react'
import { SectionComponent, ImageComponent } from '../ui'
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
    <SectionComponent id={id} variant="card-section" spacing="default">
      <ImageComponent
        id={`${id}-image`}
        src={fullImageUrl}
        alt={alt}
        variant="cover"
        rounded={true}
      />
    </SectionComponent>
  )
}

export default MainImageSection 
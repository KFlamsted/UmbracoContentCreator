import { useState, useEffect } from 'react'
import type { ImageCropperValue } from '../model/common/ImageCropperValue'
import { fetchImageById } from '../services/MediaService'

export const useImageById = (imageId?: string) => {
  const [image, setImage] = useState<ImageCropperValue | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!imageId) {
      setImage(null)
      setLoading(false)
      setError(null)
      return
    }

    const loadImage = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const imageCropperValue = await fetchImageById(imageId)
        setImage(imageCropperValue)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load image')
        setImage(null)
      } finally {
        setLoading(false)
      }
    }

    loadImage()
  }, [imageId])

  return { image, loading, error }
}

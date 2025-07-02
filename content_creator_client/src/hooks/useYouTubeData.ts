import { useState, useEffect } from 'react'
import { getChannelLatestVideos } from '../services/googleApiClient'
import type { VideoSummary } from '../model/VideoSummary'

interface UseYouTubeDataResult {
  videos: VideoSummary[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Custom hook to fetch YouTube channel videos
 * @param channelId - YouTube channel ID
 * @param maxResults - Maximum number of videos to fetch (default: 10)
 * @returns Object containing videos, loading state, error, and refetch function
 */
export const useYouTubeData = (
  channelId: string | null, 
  maxResults: number = 10
): UseYouTubeDataResult => {
  const [videos, setVideos] = useState<VideoSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = async () => {
    if (!channelId) {
      setVideos([])
      setLoading(false)
      setError(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const result = await getChannelLatestVideos(channelId, maxResults)
      setVideos(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch YouTube videos'
      setError(errorMessage)
      console.error('YouTube API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchVideos()
  }

  useEffect(() => {
    fetchVideos()
  }, [channelId, maxResults])

  return { videos, loading, error, refetch }
} 
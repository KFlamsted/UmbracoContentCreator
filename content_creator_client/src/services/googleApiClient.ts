import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'

// YouTube API response interfaces
export interface YouTubeVideoSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: {
    default: { url: string; width: number; height: number }
    medium: { url: string; width: number; height: number }
    high: { url: string; width: number; height: number }
    standard?: { url: string; width: number; height: number }
    maxres?: { url: string; width: number; height: number }
  }
  channelTitle: string
  tags?: string[]
  categoryId: string
  liveBroadcastContent: string
  localized: {
    title: string
    description: string
  }
}

export interface YouTubeVideo {
  kind: string
  etag: string
  id: string
  snippet: YouTubeVideoSnippet
}

export interface YouTubeSearchResponse {
  kind: string
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YouTubeVideo[]
}

// Create axios instance for backend YouTube API proxy
const youtubeApiClient: AxiosInstance = axios.create({
  baseURL: '/api/youtube', // Use backend proxy instead of Google API directly
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Remove the API key - it's now handled by the backend
})

// Request interceptor for logging/debugging
youtubeApiClient.interceptors.request.use(
  (config) => {
    // Log API requests in development
    if (import.meta.env.DEV) {
      console.log('YouTube API Request:', {
        url: config.url,
        params: config.params,
      })
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
youtubeApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('YouTube API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      })
    } else if (error.request) {
      console.error('YouTube API Network Error:', error.request)
    } else {
      console.error('YouTube API Request Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// Helper function to handle API responses
const handleApiResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data
}

// Service function to get latest videos from a YouTube channel
export const getChannelLatestVideos = async (
  channelId: string,
  maxResults: number = 10
): Promise<YouTubeVideo[]> => {
  try {
    const response = await youtubeApiClient.get<YouTubeSearchResponse>(
      `/channel/${channelId}/videos`,
      {
        params: {
          maxResults: maxResults,
        },
      }
    )

    return handleApiResponse(response).items
  } catch (error) {
    console.error('Failed to fetch channel videos:', error)
    throw error
  }
}

// Service function to get channel information
export const getChannelInfo = async (channelId: string) => {
  try {
    const response = await youtubeApiClient.get(`/channel/${channelId}/info`)

    return handleApiResponse(response)
  } catch (error) {
    console.error('Failed to fetch channel info:', error)
    throw error
  }
}

export { youtubeApiClient, handleApiResponse } 
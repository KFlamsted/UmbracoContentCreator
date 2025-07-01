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

// Create axios instance for Google YouTube API
const googleApiClient: AxiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: import.meta.env.VITE_GOOGLE_API_KEY,
  },
})

// Request interceptor for logging/debugging
googleApiClient.interceptors.request.use(
  (config) => {
    // Log API requests in development
    if (import.meta.env.DEV) {
      console.log('Google API Request:', {
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
googleApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('Google API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      })
    } else if (error.request) {
      console.error('Google API Network Error:', error.request)
    } else {
      console.error('Google API Request Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// Helper function to handle Google API responses
const handleGoogleApiResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data
}

// Service function to get latest videos from a YouTube channel
export const getChannelLatestVideos = async (
  channelId: string,
  maxResults: number = 10
): Promise<YouTubeVideo[]> => {
  try {
    const response = await googleApiClient.get<YouTubeSearchResponse>('/search', {
      params: {
        part: 'snippet',
        channelId: channelId,
        maxResults: maxResults,
        order: 'date',
        type: 'video',
      },
    })

    return handleGoogleApiResponse(response).items
  } catch (error) {
    console.error('Failed to fetch channel videos:', error)
    throw error
  }
}

// Service function to get channel information
export const getChannelInfo = async (channelId: string) => {
  try {
    const response = await googleApiClient.get('/channels', {
      params: {
        part: 'snippet,statistics',
        id: channelId,
      },
    })

    return handleGoogleApiResponse(response)
  } catch (error) {
    console.error('Failed to fetch channel info:', error)
    throw error
  }
}

export { googleApiClient, handleGoogleApiResponse } 
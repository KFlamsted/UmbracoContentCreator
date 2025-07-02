import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'
import { type VideoListResponse, type VideoSummary } from '../model/VideoSummary'

// Create axios instance for backend YouTube API proxy
const youtubeApiClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/youtube`, // Use backend proxy instead of Google API directly
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Remove the API key - it's now handled by the backend
})

// Request interceptor for logging/debugging
youtubeApiClient.interceptors.request.use(
  (config) => {
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
): Promise<VideoSummary[]> => {
  try {
    const response = await youtubeApiClient.get<VideoListResponse>(
      `/channel/${channelId}/videos`,
      {
        params: {
          maxResults: maxResults,
        },
      }
    )

    return handleApiResponse(response).videos
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
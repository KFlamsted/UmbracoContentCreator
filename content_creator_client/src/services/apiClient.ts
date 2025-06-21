import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'
import type { IUmbracoContentResponse } from '../model/common/UmbracoCommon'

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/umbraco/delivery/api/v2`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging/debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      })
    } else if (error.request) {
      console.error('Network Error:', error.request)
    } else {
      console.error('Request Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// Helper function to handle API responses
const handleApiResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data
}

// Helper function to handle content responses
const handleContentResponse = <TProperties>(
  response: AxiosResponse<IUmbracoContentResponse<TProperties>>
): IUmbracoContentResponse<TProperties> => {
  const data = response.data
  
  if (data.total === 0 || !data.items.length) {
    throw new Error('Content not found')
  }
  
  return data
}

export { apiClient, handleApiResponse, handleContentResponse } 
import type { ImageCropperValue } from '../model/common/ImageCropperValue'
import { apiClient } from './apiClient'
import type { AxiosError } from 'axios'

export interface IUmbracoMediaResponse<TProperties = Record<string, unknown>> {
  total: number
  items: IUmbracoMediaItem<TProperties>[]
}

export interface IUmbracoMediaItem<TProperties = Record<string, unknown>> {
  id: string
  name: string
  mediaType: string
  url: string
  extension: string
  width?: number
  height?: number
  bytes: number
  properties: TProperties
  createDate: string
  updateDate: string
}

export const executeMediaApiQuery = async <
  TProperties = Record<string, unknown>
>(params?: {
  mediaType?: string
  id?: string
  filter?: string
  sort?: string
  skip?: number
  take?: number
}): Promise<IUmbracoMediaResponse<TProperties>> => {
  const searchParams = new URLSearchParams()

  if (params?.mediaType) {
    searchParams.append('filter', `mediaType:${params.mediaType}`)
  }
  if (params?.filter) {
    searchParams.append('filter', params.filter)
  }
  if (params?.sort) {
    searchParams.append('sort', params.sort)
  }
  if (params?.skip) {
    searchParams.append('skip', params.skip.toString())
  }
  if (params?.take) {
    searchParams.append('take', params.take.toString())
  }

  const queryString = searchParams.toString()
  const url = `/media${queryString ? `?${queryString}` : ''}`

  const response = await apiClient.get<IUmbracoMediaResponse<TProperties>>(url)
  return response.data
}

export const fetchMediaById = async <TProperties = Record<string, unknown>>(
  id: string
): Promise<IUmbracoMediaItem<TProperties> | null> => {
  try {
    const response = await apiClient.get<IUmbracoMediaItem<TProperties>>(
      `/media/item/${id}`
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 404) return null
    throw error
  }
}

export const fetchImageById = async (
  id: string
): Promise<ImageCropperValue | null> => {
  const mediaItem = await fetchMediaById(id)
  if (!mediaItem) return null

  // Map media item to ImageCropperValue structure
  return {
    focalPoint: null, // Default to null as per API structure
    crops: [], // Default to empty array
    id: mediaItem.id,
    name: mediaItem.name,
    mediaType: mediaItem.mediaType,
    url: mediaItem.url,
    extension: mediaItem.extension,
    width: mediaItem.width || 0,
    height: mediaItem.height || 0,
    bytes: mediaItem.bytes,
    properties: mediaItem.properties,
  }
}

export const fetchMediaByType = async <TProperties = Record<string, unknown>>(
  mediaType: string,
  options?: {
    sort?: string
    skip?: number
    take?: number
  }
): Promise<IUmbracoMediaResponse<TProperties>> => {
  return executeMediaApiQuery<TProperties>({
    mediaType,
    ...options,
  })
}

export const fetchImageMedia = async <
  TProperties = Record<string, unknown>
>(options?: {
  sort?: string
  skip?: number
  take?: number
}): Promise<IUmbracoMediaResponse<TProperties>> => {
  return executeMediaApiQuery<TProperties>({
    filter: 'mediaType:Image',
    ...options,
  })
}

import type { IUmbracoContentResponse, IUmbracoItem } from '../model/common/UmbracoCommon'
import { apiClient, handleContentResponse } from './apiClient'

export const executeContentApiQuery = async <
  TProperties = Record<string, unknown>
>(
  contentType: string,
  additionalParams?: Record<string, string>
): Promise<IUmbracoContentResponse<TProperties>> => {
  const params = new URLSearchParams({
    filter: `contentType:${contentType}`,
    ...additionalParams,
  })

  const response = await apiClient.get<IUmbracoContentResponse<TProperties>>(
    `/content?${params.toString()}`
  )

  return handleContentResponse(response)
}

export const fetchContentByRoute = async <
  T,
  TProperties = Record<string, unknown>
>(
  contentType: string
): Promise<T> => {
  const result = await executeContentApiQuery<TProperties>(contentType)
  
  if (!result) {
    throw new Error('Content not found')
  }

  return result as unknown as T
}

export const fetchChildrenById = async <TProperties = Record<string, unknown>>(
  parentId: string,
  options?: {
    contentType?: string
    take?: number
  }
): Promise<IUmbracoContentResponse<TProperties>> => {
  const params = new URLSearchParams({
    fetch: `children:${parentId}`,
  })

  if (options?.contentType) {
    params.append('filter', `contentType:${options.contentType}`)
  }

  if (options?.take) {
    params.append('take', options.take.toString())
  }

  const response = await apiClient.get<IUmbracoContentResponse<TProperties>>(
    `/content?${params.toString()}`
  )

  return handleContentResponse(response)
}

export const fetchContentByIdOrPath = async <TProperties = Record<string, unknown>>(
  idOrPath: string
): Promise<IUmbracoItem<TProperties>> => {
  try {
    const response = await apiClient.get<IUmbracoItem<TProperties>>(
      `/content/item/${encodeURIComponent(idOrPath)}`
    )

    return response.data
  } catch (error) {
    console.error('Error fetching content by ID or path:', error)
    throw error
  }
}

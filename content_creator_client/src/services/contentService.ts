import moment from 'moment'
import type { IUmbracoContentResponse } from '../model/common/UmbracoCommon'

export const executeContentApiQuery = async <TProperties = Record<string, unknown>>(
  contentType: string
): Promise<IUmbracoContentResponse<TProperties>> => {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(
    `${apiUrl}/umbraco/delivery/api/v2/content?filter=contentType:${contentType}`
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result: IUmbracoContentResponse<TProperties> = await response.json()

  if (result.total === 0 || !result.items.length) {
    throw new Error('Content not found')
  }

  return result
}

export const fetchContentByRoute = async <T, TProperties = Record<string, unknown>>(
  contentType: string
): Promise<T> => {
  const result = await executeContentApiQuery<TProperties>(contentType)
  const content = result

  if (!content) {
    throw new Error('Content not found')
  }

  // This will need to be handled differently for different content types
  // For now, we assume the caller knows how to map the properties
  return content as unknown as T
}

export const fetchChildrenById = async <TProperties = Record<string, unknown>>(
  parentId: string,
  options?: {
    contentType?: string
    take?: number
    publishedBefore?: moment.Moment
  }
): Promise<IUmbracoContentResponse<TProperties>> => {
  const apiUrl = import.meta.env.VITE_API_URL
  const searchParams = new URLSearchParams()

  // Build filter conditions
  const filterConditions: string[] = []

  if (options?.contentType) {
    filterConditions.push(`contentType:${options.contentType}`)
  }

  if (options?.publishedBefore) {
    const dateString = options.publishedBefore.toISOString()
    filterConditions.push(`publishDate:[* TO ${dateString}]`)
  } else {
    // Default to today if no date specified
    const today = moment().toISOString()
    filterConditions.push(`publishDate:[* TO ${today}]`)
  }

  // Combine all filter conditions with AND
  if (filterConditions.length > 0) {
    searchParams.append('filter', filterConditions.join(' AND '))
  }

  if (options?.take) {
    searchParams.append('take', options.take.toString())
  }

  const queryString = searchParams.toString()
  const url = `${apiUrl}/umbraco/delivery/api/v2/content/item/${parentId}/children${
    queryString ? `?${queryString}` : ''
  }`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result: IUmbracoContentResponse<TProperties> = await response.json()
  return result
}

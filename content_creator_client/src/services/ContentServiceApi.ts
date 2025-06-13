import type { IUmbracoContentResponse } from '../model/common/UmbracoCommon'

export const executeContentApiQuery = async <
  TProperties = Record<string, unknown>
>(
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

export const fetchContentByRoute = async <
  T,
  TProperties = Record<string, unknown>
>(
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
  }
): Promise<IUmbracoContentResponse<TProperties>> => {
  const apiUrl = import.meta.env.VITE_API_URL

  // Build query parameters manually to avoid URL encoding issues
  const queryParams: string[] = []

  // Build filter conditions
  const filterConditions: string[] = []

  if (options?.contentType) {
    filterConditions.push(`contentType:${options.contentType}`)
  }

  // Add filter parameter without URL encoding the colon
  if (filterConditions.length > 0) {
    queryParams.push(`filter=${filterConditions.join(' AND ')}`)
  }

  if (options?.take) {
    queryParams.push(`take=${options.take}`)
  }

  const queryString = queryParams.join('&')
  const url = `${apiUrl}/umbraco/delivery/api/v2/content?fetch=children:${parentId}${
    queryString ? `&${queryString}` : ''
  }`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result: IUmbracoContentResponse<TProperties> = await response.json()
  return result
}

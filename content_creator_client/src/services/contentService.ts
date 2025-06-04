import type { HomePage } from '../model/HomePage'
import type { IUmbracoContentResponse, IHomePageProperties } from '../model/common/UmbracoCommon'

const executeContentApiQuery = async <TProperties = Record<string, unknown>>(
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

export const fetchHomePage = async (): Promise<HomePage> => {
  const result = await executeContentApiQuery<IHomePageProperties>('homePage')
  const homepageContent = result.items?.[0]
  
  if (!homepageContent) {
    throw new Error('Content not found')
  }

  return {
    pageTitle: homepageContent.properties.pageTitle,
    bodyText: homepageContent.properties.bodyText?.markup,
    footerText: homepageContent.properties.footerText,
  }
}

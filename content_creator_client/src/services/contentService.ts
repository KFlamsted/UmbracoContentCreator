import type { HomePage } from '../models/HomePage'
import type { IUmbracoContentResponse } from '../models/common/UmbracoCommon'

const executeContentApiQuery = async (
  contentType: string
): Promise<IUmbracoContentResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(
    `${apiUrl}/umbraco/delivery/api/v2/content?filter=contentType:${contentType}`
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result: IUmbracoContentResponse = await response.json()

  if (result.total === 0 || !result.items.length) {
    throw new Error('Content not found')
  }

  return result
}

export const fetchContentByRoute = async <T>(
  contentType: string
): Promise<T> => {
  const result = await executeContentApiQuery(contentType)
  console.log('API response:', result)
  const homepageContent = result.items?.[0]
  console.log('Fetched content:', homepageContent)

  if (!homepageContent) {
    throw new Error('Content not found')
  }

  return {
    pageTitle: homepageContent.properties.pageTitle,
    bodyText: homepageContent.properties.bodyText?.markup,
    footerText: homepageContent.properties.footerText,
  } as T
}

export const fetchHomePage = async (): Promise<HomePage> => {
  return fetchContentByRoute<HomePage>('homePage')
}

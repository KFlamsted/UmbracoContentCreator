import type { HomePage } from '../models/HomePage'

// TODO: Define proper block content structure when blocks are actually used
interface UmbracoBlock {
  contentUdi: string
  settingsUdi?: string
  content: {
    contentType: string
    properties: Record<string, unknown>
  }
  settings?: {
    contentType: string
    properties: Record<string, unknown>
  }
}

// TODO: Define proper culture structure based on Umbraco's multi-language setup
interface UmbracoCultures {
  [key: string]: unknown
}

interface UmbracoContentResponse {
  total: number
  items: Array<{
    contentType: string
    name: string
    createDate: string
    updateDate: string
    route: {
      path: string
      startItem: {
        id: string
        path: string
      }
    }
    id: string
    properties: {
      pageTitle?: string
      bodyText?: {
        markup: string
        blocks: UmbracoBlock[]
      }
      footerText?: string
      // TODO: Add other property types as they are discovered/needed
      [key: string]: unknown
    }
    cultures: UmbracoCultures
  }>
}

const executeContentApiQuery = async (): Promise<UmbracoContentResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/umbraco/delivery/api/v2/content`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result: UmbracoContentResponse = await response.json()

  if (result.total === 0 || !result.items.length) {
    throw new Error('Content not found')
  }

  return result
}

export const fetchContentByRoute = async <T>(): Promise<T> => {
  const result = await executeContentApiQuery()

  const homepageContent = result.items?.find(
    (content) => content.contentType === 'homePage'
  )
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
  return fetchContentByRoute<HomePage>()
}

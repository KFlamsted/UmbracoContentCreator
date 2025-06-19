import type { HomePage } from '../model/HomePage'
import type { News } from '../model/News'
import type { NewsItemPage, AuthorReference, Link } from '../model/NewsItemPage'
import type { ImageCropperValue } from '../model/common/ImageCropperValue'
import type {
  IHomePageProperties,
  INewsProperties,
  INewsItemProperties,
} from '../model/common/UmbracoCommon'
import { executeContentApiQuery, fetchContentByIdOrPath } from './ContentServiceApi'

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
    backgroundImage: homepageContent.properties.backgroundImage || 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Temporary fallback for demo
  }
}

export const fetchNewsPage = async (): Promise<News> => {
  const result = await executeContentApiQuery<INewsProperties>('news')
  const newsContent = result.items?.[0]

  if (!newsContent) {
    throw new Error('Content not found')
  }

  // Extract the first image from the mainImage array and map to ImageCropperValue
  const mainImageArray = newsContent.properties.mainImage as unknown as ImageCropperValue[]
  const mainImage = mainImageArray && mainImageArray.length > 0 ? mainImageArray[0] : undefined

  return {
    id: newsContent.id,
    categoryFilterOptions: newsContent.properties.categoryFilterOptions,
    defaultSortOrder: newsContent.properties.defaultSortOrder,
    description: newsContent.properties.description,
    mainImage,
    newsPerPage: newsContent.properties.newsPerPage,
    showFeaturedNews: newsContent.properties.showFeaturedNews,
    title: newsContent.properties.title,
  }
}

export const fetchNewsItemPage = async (itemId: string): Promise<NewsItemPage> => {
  try {
    const result = await fetchContentByIdOrPath<INewsItemProperties>(itemId)
    
    if (!result) {
      throw new Error('News item not found')
    }    // Extract the first image from the mainImage array if it exists
    const mainImageArray = result.properties.mainImage as unknown as ImageCropperValue[]
    const mainImage = mainImageArray && mainImageArray.length > 0 ? mainImageArray[0] : undefined

    return {
      id: result.id,
      title: result.properties.title || result.name || 'Untitled',
      summary: result.properties.summary || '',
      publishDate: result.properties.publishDate || result.createDate,
      featured: result.properties.featured || false,
      bodyText: result.properties.bodyText || { markup: '', blocks: [] },
      mainImage,
      author: result.properties.author as AuthorReference,
      attachements: result.properties.attachements as ImageCropperValue[],
      relatedLinks: result.properties.relatedLinks as Link[],
    }
  } catch (error) {
    console.error('Error fetching news item:', error)
    throw new Error(`Failed to fetch news item: ${itemId}`)
  }
}

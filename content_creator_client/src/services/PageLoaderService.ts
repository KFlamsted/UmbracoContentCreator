import type { HomePage } from '../model/HomePage'
import type { News } from '../model/News'
import type { NewsItemPage, AuthorReference, Link } from '../model/NewsItemPage'
import type { YoutubeParentPage } from '../model/YoutubeParentPage'
import type { ImageCropperValue } from '../model/common/ImageCropperValue'
import type {
  IHomePageProperties,
  INewsProperties,
  INewsItemProperties,
  IYoutubeParentPageProperties,
} from '../model/common/UmbracoCommon'
import { executeContentApiQuery, fetchContentByIdOrPath } from './ContentServiceApi'

export const fetchHomePage = async (): Promise<HomePage> => {
  const result = await executeContentApiQuery<IHomePageProperties>('homePage')
  const homepageContent = result.items?.[0]

  if (!homepageContent) {
    throw new Error('Content not found')
  }

  // Extract backgroundImage if it exists, similar to how we handle mainImage in news
  const backgroundImageArray = homepageContent.properties.backgroundImage as unknown as ImageCropperValue[]
  const backgroundImage = backgroundImageArray && backgroundImageArray.length > 0 ? backgroundImageArray[0] : undefined

  return {
    pageTitle: homepageContent.properties.pageTitle,
    bodyText: homepageContent.properties.bodyText?.markup,
    footerText: homepageContent.properties.footerText,
    backgroundImage,
    color1: homepageContent.properties.color1,
    color2: homepageContent.properties.color2,
    color3: homepageContent.properties.color3,
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

export const fetchYoutubeParentPage = async (): Promise<YoutubeParentPage> => {
  const result = await executeContentApiQuery<IYoutubeParentPageProperties>('youtubeParentPage')
  const youtubeParentContent = result.items?.[0]

  if (!youtubeParentContent) {
    throw new Error('YouTube parent page not found')
  }

  return {
    id: youtubeParentContent.id,
  }
}

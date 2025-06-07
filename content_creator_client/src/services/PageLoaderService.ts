import type { HomePage } from '../model/HomePage'
import type { News } from '../model/News'
import type { ImageCropperValue } from '../model/common/ImageCropperValue'
import type {
  IHomePageProperties,
  INewsProperties,
} from '../model/common/UmbracoCommon'
import { executeContentApiQuery } from './ContentService'

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

export const fetchNewsPage = async (): Promise<News> => {
  const result = await executeContentApiQuery<INewsProperties>('news')
  const newsContent = result.items?.[0]

  if (!newsContent) {
    throw new Error('Content not found')
  }

  return {
    categoryFilterOptions: newsContent.properties.categoryFilterOptions,
    defaultSortOrder: newsContent.properties.defaultSortOrder,
    description: newsContent.properties.description,
    mainImage: newsContent.properties.mainImage as unknown as ImageCropperValue, // TODO: Map MediaWithCrops to ImageCropperValue
    newsPerPage: newsContent.properties.newsPerPage,
    showFeaturedNews: newsContent.properties.showFeaturedNews,
    title: newsContent.properties.title,
  }
}

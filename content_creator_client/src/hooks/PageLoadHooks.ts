import { useState, useEffect, useMemo } from 'react'
import type { HomePage } from '../model/HomePage'
import type { News } from '../model/News'
import type { NewsItemPage, AuthorReference, Link } from '../model/NewsItemPage'
import type { ImageCropperValue } from '../model/common/ImageCropperValue'
import type { IUmbracoBlock, IUmbracoItem } from '../model/common/UmbracoCommon'
import { fetchNewsPage, fetchNewsItemPage } from '../services/PageLoaderService'
import { fetchChildrenById } from '../services/ContentServiceApi'
import type { IUmbracoContentResponse } from '../model/common/UmbracoCommon'
import { useGlobalData } from './useGlobalData'
import type { YoutubeParentPage } from '../model/YoutubeParentPage'
import type { YoutubePage } from '../model/YoutubePage'
import { fetchYoutubeParentPage } from '../services/PageLoaderService'

const useContent = <T>(fetchFunction: () => Promise<T>) => {
  const [content, setContent] = useState<T>({} as T)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchFunction()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [fetchFunction])

  return { content, loading, error }
}

const useContentChildren = <T>(
  parentId?: string,
  options?: {
    contentType?: string
    take?: number
  },
  mapFunction?: (item: IUmbracoItem) => T
) => {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => options, [options])

  useEffect(() => {
    if (!parentId) {
      setItems([])
      setLoading(false)
      setError(null)
      return
    }

    const loadItems = async () => {
      setLoading(true)
      setError(null)

      try {
        const response: IUmbracoContentResponse = await fetchChildrenById(
          parentId,
          memoizedOptions
        )

        // Map the response items using the provided mapping function or return raw items
        const mappedItems: T[] = mapFunction
          ? response.items.map(mapFunction)
          : (response.items as T[])

        setItems(mappedItems)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load content items'
        )
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    loadItems()
  }, [parentId, memoizedOptions, mapFunction])

  return { items, loading, error }
}

export const useNewsPageItems = (parentId?: string, take?: number) => {
  // Memoize the mapping function to prevent recreation on every render
  const mapNewsItem = useMemo(
    () =>
      (item: IUmbracoItem): NewsItemPage => ({
        id: item.id,
        title: item.properties.title as string,
        summary: item.properties.summary as string,
        publishDate: item.properties.publishDate as string,
        featured: item.properties.featured as boolean,
        mainImage: item.properties.mainImage as ImageCropperValue,
        bodyText: item.properties.bodyText as {
          markup: string
          blocks: IUmbracoBlock[]
        },
        author: item.properties.author as AuthorReference,
        attachements: item.properties.attachements as ImageCropperValue[],
        relatedLinks: item.properties.relatedLinks as Link[],
      }),
    []
  )

  // Memoize options object
  const options = useMemo(
    () => ({
      contentType: 'newsItemPage',
      take,
    }),
    [take]
  )

  const {
    items: newsItems,
    loading,
    error,
  } = useContentChildren<NewsItemPage>(parentId, options, mapNewsItem)

  return { newsItems, loading, error }
}

export const useNewsItemPage = (itemId?: string) => {
  const [content, setContent] = useState<NewsItemPage>({} as NewsItemPage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!itemId) {
      setContent({} as NewsItemPage)
      setLoading(false)
      setError(null)
      return
    }

    const loadContent = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchNewsItemPage(itemId)
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setContent({} as NewsItemPage)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [itemId])

  return { content, loading, error }
}

export const useHomePage = () => {
  const { globalData, loading, error } = useGlobalData()

  return {
    content: {
      pageTitle: globalData.pageTitle,
      bodyText: globalData.bodyText,
      footerText: globalData.footerText,
      backgroundImage: globalData.backgroundImage,
      color1: globalData.color1,
      color2: globalData.color2,
      color3: globalData.color3,
    } as HomePage,
    loading,
    error,
  }
}
export const useNewsPage = () => useContent<News>(fetchNewsPage)

export const useYoutubeParentPage = () => {
  // First get the YouTube parent page content (similar to useNewsPage)
  const {
    content: parentPage,
    loading: parentLoading,
    error: parentError,
  } = useContent<YoutubeParentPage>(fetchYoutubeParentPage)

  // Memoize the mapping function to prevent recreation on every render
  const mapYoutubeItem = useMemo(
    () =>
      (item: IUmbracoItem): YoutubePage => ({
        id: item.id,
        amountOfVideos: item.properties.amountOfVideos as number,
        featuredVideoUrl: item.properties.featuredVideoUrl as string,
        menuName: item.properties.menuName as string,
        pageTitle: item.properties.pageTitle as string,
        youtubeChannelName: item.properties.youtubeChannelName as string,
        channelId: item.properties.channelId as string,
      }),
    []
  )

  // Memoize options object
  const options = useMemo(
    () => ({
      contentType: 'youtubePage',
    }),
    []
  )

  // Use the parent page ID to fetch children (similar to NewsPageContainer)
  const {
    items: youtubePages,
    loading: childrenLoading,
    error: childrenError,
  } = useContentChildren<YoutubePage>(parentPage.id, options, mapYoutubeItem)

  // Combine parent and children data
  const youtubeParentPageWithChildren: YoutubeParentPage = {
    ...parentPage,
    children: youtubePages,
  }

  // Only show loading if parent is loading, or if parent is loaded and children are loading and parentPage.id is defined
  const loading = parentLoading || (!!parentPage.id && childrenLoading)

  return {
    content: youtubeParentPageWithChildren,
    loading,
    error: parentError || childrenError,
  }
}

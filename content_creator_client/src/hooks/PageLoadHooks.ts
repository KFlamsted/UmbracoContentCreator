import { useState, useEffect, useMemo } from 'react'
import type { HomePage } from '../model/HomePage'
import type { News } from '../model/News'
import type { NewsItemPage, AuthorReference, Link } from '../model/NewsItemPage'
import type { ImageCropperValue } from '../model/common/ImageCropperValue'
import type { IUmbracoBlock, IUmbracoItem } from '../model/common/UmbracoCommon'
import { fetchHomePage, fetchNewsPage } from '../services/PageLoaderService'
import { fetchChildrenById } from '../services/ContentService2'
import type { IUmbracoContentResponse } from '../model/common/UmbracoCommon'

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

export const useHomePage = () => useContent<HomePage>(fetchHomePage)
export const useNewsPage = () => useContent<News>(fetchNewsPage)

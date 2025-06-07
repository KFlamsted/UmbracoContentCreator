import { useState, useEffect } from 'react'
import type { HomePage } from '../model/HomePage'
import type { News } from '../model/News'
import { fetchHomePage, fetchNewsPage } from '../services/PageLoaderService'

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

// Keep the original useHomePage for backward compatibility
export const useHomePage = () => useContent<HomePage>(fetchHomePage)
export const useNewsPage = () => useContent<News>(fetchNewsPage)

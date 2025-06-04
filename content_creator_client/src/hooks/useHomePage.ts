import { useState, useEffect } from 'react'
import type { HomePage } from '../model/HomePage'
import { fetchHomePage } from '../services/contentService'

export const useHomePage = () => {
  const [content, setContent] = useState<HomePage>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchHomePage()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
    console.log('useHomePage effect triggered')
  }, [])

  return { content, loading, error }
}

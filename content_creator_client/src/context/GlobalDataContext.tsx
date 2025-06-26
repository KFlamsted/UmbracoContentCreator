import React, { createContext, useEffect, useState } from 'react'
import type { HomePage } from '../model/HomePage'
import { fetchHomePage } from '../services/PageLoaderService'

interface GlobalData {
  /**
   * Global properties that are needed across all pages
   */
  footerText?: string
  backgroundImage?: HomePage['backgroundImage']
  pageTitle?: string
  bodyText?: string
  /**
   * Theme colors for the website
   */
  color1?: string
  color2?: string
  color3?: string
}

interface GlobalDataContextType {
  globalData: GlobalData
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const GlobalDataContext = createContext<GlobalDataContextType | null>(null)

export { GlobalDataContext }

interface GlobalDataProviderProps {
  children: React.ReactNode
}

export const GlobalDataProvider: React.FC<GlobalDataProviderProps> = ({ children }) => {
  const [globalData, setGlobalData] = useState<GlobalData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGlobalData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch homepage data which contains global properties
      const homePage = await fetchHomePage()
      
      setGlobalData({
        footerText: homePage.footerText,
        backgroundImage: homePage.backgroundImage,
        pageTitle: homePage.pageTitle,
        bodyText: homePage.bodyText,
        color1: homePage.color1,
        color2: homePage.color2,
        color3: homePage.color3,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load global data')
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchGlobalData()
  }

  useEffect(() => {
    fetchGlobalData()
  }, [])

  const value: GlobalDataContextType = {
    globalData,
    loading,
    error,
    refetch,
  }

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  )
}

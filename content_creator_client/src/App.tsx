import { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import './App.css'
import type { HomePage } from './models/HomePage'
import { fetchHomePage } from './services/contentService'

const App: React.FC = () => {
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
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-center px-4">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-center px-4">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-center px-4 py-8">
      {/* Tailwind test element - remove this after testing */}
      <div className="bg-red-500 text-white p-4 mb-4 rounded-lg border-4 border-yellow-400">
        TAILWIND TEST: If you see red background with yellow border, Tailwind is working!
      </div>
      
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          {content.pageTitle}
        </h1>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="text-lg text-gray-700">
          {content.bodyText ? parse(content.bodyText) : ''}
        </div>
      </div>
    </div>
  )
}

export default App

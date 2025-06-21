import { useState, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './Routes'
import AppShell from './components/appShell/AppShell'
import { useHomePage } from './hooks/PageLoadHooks'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Get homepage data for background image
  const { content: homePage } = useHomePage()

  const handleStateChange = useCallback((newLoading: boolean, newError: string | null) => {
    setLoading(newLoading)
    setError(newError)
  }, [])

  return (
    <BrowserRouter>
      <AppShell 
        loading={loading} 
        error={error}
        backgroundImage={homePage.backgroundImage}
      >
        <AppRoutes onStateChange={handleStateChange} />
      </AppShell>
    </BrowserRouter>
  )
}

export default App

import { useState, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './Routes'
import AppShell from './components/appShell/AppShell'
import { GlobalDataProvider } from './context/GlobalDataContext'
import { useGlobalData } from './hooks/useGlobalData'

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Get global data including background image
  const { globalData } = useGlobalData()

  const handleStateChange = useCallback((newLoading: boolean, newError: string | null) => {
    setLoading(newLoading)
    setError(newError)
  }, [])

  return (
    <AppShell 
      loading={loading} 
      error={error}
      backgroundImage={globalData.backgroundImage?.url}
    >
      <AppRoutes onStateChange={handleStateChange} />
    </AppShell>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalDataProvider>
        <AppContent />
      </GlobalDataProvider>
    </BrowserRouter>
  )
}

export default App

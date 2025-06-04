import { useState, useCallback } from 'react'
import './App.css'
import HomePageContainer from './containers/homePage/HomePageContainer'
import AppShell from './components/appShell/AppShell'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleStateChange = useCallback((newLoading: boolean, newError: string | null) => {
    setLoading(newLoading)
    setError(newError)
  }, [])

  return (
    <AppShell loading={loading} error={error}>
      <HomePageContainer onStateChange={handleStateChange} />
    </AppShell>
  )
}

export default App

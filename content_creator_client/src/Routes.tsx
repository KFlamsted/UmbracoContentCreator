import { Routes, Route } from 'react-router-dom'
import HomePageContainer from './containers/homePage/HomePageContainer'
import NewsPageContainer from './containers/newsPage/NewsPageContainer'

interface AppRoutesProps {
  onStateChange: (loading: boolean, error: string | null) => void
}

const AppRoutes: React.FC<AppRoutesProps> = ({ onStateChange }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePageContainer onStateChange={onStateChange} />} />
      <Route path="/news" element={<NewsPageContainer onStateChange={onStateChange} />} />
    </Routes>
  )
}

export default AppRoutes

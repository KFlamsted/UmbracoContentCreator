import { Routes, Route } from 'react-router-dom'
import HomePageContainer from './containers/homePage/HomePageContainer'
import NewsPageContainer from './containers/newsPage/NewsPageContainer'
import NewsItemPageContainer from './containers/newsItemPage/NewsItemPageContainer'
import { ROUTES } from './constants/routes'

interface AppRoutesProps {
  onStateChange: (loading: boolean, error: string | null) => void
}

const AppRoutes: React.FC<AppRoutesProps> = ({ onStateChange }) => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePageContainer onStateChange={onStateChange} />} />
      <Route path={ROUTES.NEWS} element={<NewsPageContainer onStateChange={onStateChange} />} />
      <Route path={ROUTES.NEWS_ITEM} element={<NewsItemPageContainer onStateChange={onStateChange} />} />
    </Routes>
  )
}

export default AppRoutes

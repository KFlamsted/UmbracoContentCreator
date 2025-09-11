import { Routes, Route } from 'react-router-dom'
import HomePageContainer from './containers/homePage/HomePageContainer'
import NewsPageContainer from './containers/newsPage/NewsPageContainer'
import YoutubePageContainer from './containers/youtubePage/YoutubePageContainer'
import BlueskyPageContainer from './containers/blueskyPage/BlueskyPageContainer'
import StreamingPageContainer from './containers/streamingPage/StreamingPageContainer'
import { ROUTES } from './constants/routes'

interface AppRoutesProps {
  onStateChange: (loading: boolean, error: string | null) => void
}

const AppRoutes: React.FC<AppRoutesProps> = ({ onStateChange }) => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePageContainer onStateChange={onStateChange} />} />
      <Route path={ROUTES.NEWS} element={<NewsPageContainer onStateChange={onStateChange} />} />
      <Route path={ROUTES.YOUTUBE} element={<YoutubePageContainer onStateChange={onStateChange} />} />
      <Route path={ROUTES.BLUESKY} element={<BlueskyPageContainer onStateChange={onStateChange} />} />
      <Route path={ROUTES.STREAMING} element={<StreamingPageContainer onStateChange={onStateChange} />} />
    </Routes>
  )
}

export default AppRoutes

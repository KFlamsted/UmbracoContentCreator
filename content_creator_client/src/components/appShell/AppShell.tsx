import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  getAppShellContainerClasses,
  LOADING_MESSAGE_CLASSES,
  ERROR_MESSAGE_CLASSES,
  BACKGROUND_IMAGE_CLASSES,
  BACKGROUND_IMAGE_BLURRED_CLASSES,
  CONTENT_LAYER_CLASSES,
} from '../../constants/styles'
import NavBar, { NavBarButton } from '../navigation/NavBar'
import { ROUTES } from '../../constants/routes'

interface AppShellProps {
  children: ReactNode
  loading?: boolean
  error?: string | null
  backgroundImage?: string
}

const AppShell: React.FC<AppShellProps> = ({
  children,
  loading,
  error,
  backgroundImage,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const isHomePage = location.pathname === ROUTES.HOME

  // TODO for navigation buttons:
  // - Use Umbraco API to get page names
  // - Only show button if page exist
  const apiUrl = import.meta.env.VITE_API_URL
  const fullBackgroundImageUrl = backgroundImage
    ? `${apiUrl}${backgroundImage}`
    : undefined

  return (
    <>
      {/* Background Image Layer */}
      {/* 
        Background Blur Strategy:
        - HomePage: Uses sharp background image, blur is applied locally via backdrop-filter 
          in the content section (homepage-content-overlay class in CSS)
        - All other pages: Uses globally blurred background image for consistent blur coverage
      */}
      {fullBackgroundImageUrl && (
        <div
          id={isHomePage ? "background-image-sharp" : "background-image-blurred"}
          className={
            isHomePage
              ? BACKGROUND_IMAGE_CLASSES
              : BACKGROUND_IMAGE_BLURRED_CLASSES
          }
          style={{ backgroundImage: `url(${fullBackgroundImageUrl})` }}
        />
      )}

      {/* Fixed Navigation Layer */}
      <NavBar>
        <NavBarButton
          id="nav-home-button"
          isHomePageButton
          isSelected={location.pathname === ROUTES.HOME}
          onClick={() => handleNavigation(ROUTES.HOME)}
        />
        <NavBarButton
          id="nav-news-button"
          isSelected={location.pathname === ROUTES.NEWS}
          onClick={() => handleNavigation(ROUTES.NEWS)}
        >
          Nyheder
        </NavBarButton>
        <NavBarButton
          id="nav-youtube-button"
          isSelected={location.pathname === ROUTES.YOUTUBE}
          onClick={() => handleNavigation(ROUTES.YOUTUBE)}
        >
          Youtube
        </NavBarButton>
      </NavBar>

      {/* Content Layer */}
      <div id="content-layer" className={CONTENT_LAYER_CLASSES}>
        <div
          id="app-shell-container"
          className={
            isHomePage
              ? 'w-full'
              : getAppShellContainerClasses(!!fullBackgroundImageUrl, location.pathname === ROUTES.YOUTUBE)
          }
        >
          {loading && <div id="loading-message" className={LOADING_MESSAGE_CLASSES}>Loading...</div>}
          {error && <div id="error-message" className={ERROR_MESSAGE_CLASSES}>Error: {error}</div>}
          {/* Always render children so React hooks can execute, but hide visually when loading/error */}
          <div id="app-content" style={{ display: loading || error ? 'none' : 'contents' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AppShell

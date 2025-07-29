import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BackgroundComponent, LayerComponent, AppContainerComponent, TextComponent } from '../ui'
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
  const isYoutubePage = location.pathname === ROUTES.YOUTUBE

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
      <BackgroundComponent
        id={isHomePage ? "background-image-sharp" : "background-image-blurred"}
        imageUrl={fullBackgroundImageUrl}
        variant={isHomePage ? "sharp" : "blurred"}
        zIndex="background"
      />

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
      <LayerComponent id="content-layer" layer="content" relative={true}>
        <AppContainerComponent
          id="app-shell-container"
          variant={isHomePage ? 'homepage' : (isYoutubePage ? 'page-with-nav' : 'page')}
          hasBackgroundImage={!!fullBackgroundImageUrl}
        >
          {loading && (
            <TextComponent id="loading-message" variant="muted">
              Loading...
            </TextComponent>
          )}
          {error && (
            <TextComponent id="error-message" variant="error">
              Error: {error}
            </TextComponent>
          )}
          {/* Always render children so React hooks can execute, but hide visually when loading/error */}
          <div id="app-content" style={{ display: loading || error ? 'none' : 'contents' }}>
            {children}
          </div>
        </AppContainerComponent>
      </LayerComponent>
    </>
  )
}

export default AppShell

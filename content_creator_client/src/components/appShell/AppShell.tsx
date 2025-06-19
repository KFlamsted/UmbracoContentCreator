import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  APP_SHELL_CONTAINER_CLASSES,
  LOADING_MESSAGE_CLASSES,
  ERROR_MESSAGE_CLASSES,
  BACKGROUND_IMAGE_CLASSES,
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
  return (
    <div className="min-h-screen bg-blue-200 flex flex-col relative">
      {/* Background Image Layer */}
      {backgroundImage && (
        <div
          className={BACKGROUND_IMAGE_CLASSES}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Content Layer */}
      <div className={CONTENT_LAYER_CLASSES}>
        <NavBar>
          <NavBarButton
            isHomePageButton
            isSelected={location.pathname === ROUTES.HOME}
            onClick={() => handleNavigation(ROUTES.HOME)}
          />
          <NavBarButton
            isSelected={location.pathname === ROUTES.NEWS}
            onClick={() => handleNavigation(ROUTES.NEWS)}
          >
            Nyheder
          </NavBarButton>
        </NavBar>{' '}
        <div className={isHomePage ? 'w-full' : APP_SHELL_CONTAINER_CLASSES}>
          {loading && <div className={LOADING_MESSAGE_CLASSES}>Loading...</div>}
          {error && <div className={ERROR_MESSAGE_CLASSES}>Error: {error}</div>}
          {/* Always render children so React hooks can execute, but hide visually when loading/error */}
          <div style={{ display: loading || error ? 'none' : 'contents' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppShell

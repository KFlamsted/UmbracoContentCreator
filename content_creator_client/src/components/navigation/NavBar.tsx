import type { ReactNode } from 'react'
import { 
  NAVBAR_BUTTON_BASE_CLASSES, 
  NAVBAR_BUTTON_SELECTED_CLASSES, 
  NAVBAR_BUTTON_DEFAULT_CLASSES,
  ICON_CONTAINER,
  ICON_SIZE,
  NAVBAR_CLASSES,
  NAVBAR_CONTAINER_CLASSES,
  NAVBAR_FLEX_CLASSES
} from '../../constants/styles'

interface NavBarButtonProps {
  children?: ReactNode
  isHomePageButton?: boolean
  isSelected?: boolean
  onClick?: () => void
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ 
  children, 
  isHomePageButton = false, 
  isSelected = false, 
  onClick 
}) => {
  const selectedClasses = isSelected 
    ? NAVBAR_BUTTON_SELECTED_CLASSES
    : NAVBAR_BUTTON_DEFAULT_CLASSES
    
  return (
    <button 
      id={isHomePageButton ? "nav-home-button" : `nav-button-${children?.toString().toLowerCase().replace(/\s+/g, '-') || 'button'}`}
      className={`${NAVBAR_BUTTON_BASE_CLASSES} ${selectedClasses}`}
      onClick={onClick}
      style={{ outline: 'none', border: 'none' }}
    >
      {isHomePageButton ? (
        <div id="nav-home-icon" className={ICON_CONTAINER}>
          <svg 
            id="nav-home-svg"
            className={ICON_SIZE}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path id="nav-home-path" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
      ) : (
        <span id={`nav-text-${children?.toString().toLowerCase().replace(/\s+/g, '-') || 'text'}`}>
          {children}
        </span>
      )}
    </button>
  )
}

interface NavBarProps {
  children: ReactNode
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <nav id="main-navbar" className={NAVBAR_CLASSES}>
      <div id="navbar-container" className={NAVBAR_CONTAINER_CLASSES}>
        <div id="navbar-flex" className={NAVBAR_FLEX_CLASSES}>
          {children}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
export { NavBarButton }

import type { ReactNode } from 'react'
import { NavButtonComponent, FlexComponent, HomeIconComponent, NavBarComponent } from '../ui'

interface NavBarButtonProps {
  /** Unique identifier for the navigation button */
  id: string
  children?: ReactNode
  isHomePageButton?: boolean
  isSelected?: boolean
  onClick?: () => void
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ 
  id,
  children, 
  isHomePageButton = false, 
  isSelected = false, 
  onClick 
}) => {
  return (
    <NavButtonComponent
      id={id}
      isSelected={isSelected}
      onClick={onClick}
      fixedWidth={true}
    >
      {isHomePageButton ? (
        <HomeIconComponent id={id} size="default" />
      ) : (
        children
      )}
    </NavButtonComponent>
  )
}

interface NavBarProps {
  children: ReactNode
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <NavBarComponent id="main-navbar">
      <FlexComponent id="navbar-flex" justify="center" gap="default">
        {children}
      </FlexComponent>
    </NavBarComponent>
  )
}

export default NavBar
export { NavBarButton }

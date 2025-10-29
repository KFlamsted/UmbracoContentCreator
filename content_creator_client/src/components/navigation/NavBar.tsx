import type { ReactNode } from 'react'
import { NavButtonComponent, FlexComponent, HomeIconComponent, NavBarComponent } from '../ui'
import { useScrollDirection } from '../../hooks/useScrollDirection'

interface NavBarButtonProps {
  /** Unique identifier for the navigation button */
  id: string
  children?: ReactNode
  isHomePageButton?: boolean
  isSelected?: boolean
  onClick?: () => void
  menuIcon?: string
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ 
  id,
  children, 
  isHomePageButton = false, 
  isSelected = false, 
  onClick,
  menuIcon
}) => {
  return (
    <NavButtonComponent
      id={id}
      isSelected={isSelected}
      onClick={onClick}
      fixedWidth={true}
    >
      {isHomePageButton ? (
        <HomeIconComponent id={id} size="default" imageUrl={menuIcon} />
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
  const isVisible = useScrollDirection()

  return (
    <NavBarComponent id="main-navbar" isVisible={isVisible}>
      <FlexComponent id="navbar-flex" justify="center" gap="default">
        {children}
      </FlexComponent>
    </NavBarComponent>
  )
}

export default NavBar
export { NavBarButton }

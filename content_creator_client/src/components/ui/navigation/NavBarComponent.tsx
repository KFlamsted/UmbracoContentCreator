import React from 'react'
import { getNavBarClasses } from '../../../constants/styles'

interface NavBarComponentProps {
  id: string
  children: React.ReactNode
  isVisible?: boolean
}

export const NavBarComponent: React.FC<NavBarComponentProps> = ({ 
  id, 
  children,
  isVisible = true
}) => {
  return (
    <nav id={id} className={getNavBarClasses(isVisible)}>
      {children}
    </nav>
  )
}

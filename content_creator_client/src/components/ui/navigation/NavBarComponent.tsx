import React from 'react'
import { NAVBAR_CLASSES } from '../../../constants/styles'

interface NavBarComponentProps {
  id: string
  children: React.ReactNode
}

export const NavBarComponent: React.FC<NavBarComponentProps> = ({ 
  id, 
  children 
}) => {
  return (
    <nav id={id} className={NAVBAR_CLASSES}>
      {children}
    </nav>
  )
}

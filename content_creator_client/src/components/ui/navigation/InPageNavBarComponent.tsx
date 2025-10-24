import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface InPageNavBarComponentProps {
  id: string
  children: React.ReactNode
  isVisible?: boolean
}

export const InPageNavBarComponent: React.FC<InPageNavBarComponentProps> = ({
  id,
  children,
  isVisible = true,
}) => {
  // Match the main navbar styling from NAVBAR_CLASSES but without positioning - full width, no rounded edges
  const navbarCardClasses = `
    w-full 
    ${DESIGN_TOKENS.MUTED_BG} 
    ${DESIGN_TOKENS.CARD_SHADOW} 
    py-2 
    px-4
    transition-transform
    duration-300
    ease-in-out
    ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}
  `

  return (
    <div id={id} className={navbarCardClasses}>
      {children}
    </div>
  )
}

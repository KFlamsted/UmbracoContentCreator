import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface InPageNavBarComponentProps {
  id: string
  children: React.ReactNode
}

export const InPageNavBarComponent: React.FC<InPageNavBarComponentProps> = ({ 
  id, 
  children 
}) => {
  // Match the main navbar styling from NAVBAR_CLASSES but without positioning
  const navbarCardClasses = `${DESIGN_TOKENS.MUTED_BG} ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} py-2 px-4`
  
  return (
    <div id={id} className={navbarCardClasses}>
      {children}
    </div>
  )
}

import React from 'react'
import { getInPageNavBarClasses } from '../../../constants/styles'

interface InPageNavBarComponentProps {
  id: string
  children: React.ReactNode
  isVisible?: boolean
  floating?: boolean
}

export const InPageNavBarComponent: React.FC<InPageNavBarComponentProps> = ({
  id,
  children,
  isVisible = true,
  floating = false,
}) => {
  return (
    <div id={id} className={getInPageNavBarClasses(isVisible, floating)}>
      {children}
    </div>
  )
}

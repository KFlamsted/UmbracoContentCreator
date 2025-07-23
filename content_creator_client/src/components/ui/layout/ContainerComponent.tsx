import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface ContainerComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'default' | 'homepage' | 'constrained'
  padding?: 'none' | 'small' | 'default' | 'large'
  className?: string
}

export const ContainerComponent: React.FC<ContainerComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'homepage':
        return `w-full ${DESIGN_TOKENS.HOMEPAGE_MAX_WIDTH}`
      case 'constrained':
        return `w-full ${DESIGN_TOKENS.CONTAINER_MAX_WIDTH}`
      case 'default':
      default:
        return 'w-full'
    }
  }

  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return ''
      case 'small':
        return 'p-2'
      case 'large':
        return 'p-8'
      case 'default':
      default:
        return DESIGN_TOKENS.CARD_PADDING
    }
  }

  return (
    <div 
      id={id} 
      className={`${getVariantClasses()} ${getPaddingClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface H1ComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'hero' | 'page' | 'section' | 'card'
  align?: 'left' | 'center' | 'right'
  className?: string
}

export const H1Component: React.FC<H1ComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'page',
  align = 'center'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'text-5xl md:text-7xl font-bold text-white drop-shadow-2xl'
      case 'page':
        return `${DESIGN_TOKENS.HEADING_SIZE} font-bold ${DESIGN_TOKENS.TEXT_HEADING}`
      case 'section':
        return 'text-2xl font-bold text-gray-900'
      case 'card':
        return 'text-xl font-bold text-gray-900'
      default:
        return `${DESIGN_TOKENS.HEADING_SIZE} font-bold ${DESIGN_TOKENS.TEXT_HEADING}`
    }
  }

  const getAlignClasses = () => {
    switch (align) {
      case 'left':
        return 'text-left'
      case 'center':
        return 'text-center'
      case 'right':
        return 'text-right'
      default:
        return 'text-center'
    }
  }

  return (
    <h1 
      id={id} 
      className={`${getVariantClasses()} ${getAlignClasses()} ${className}`}
    >
      {children}
    </h1>
  )
}

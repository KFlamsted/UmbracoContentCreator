import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface ParagraphComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'body' | 'small' | 'large' | 'muted'
  align?: 'left' | 'center' | 'right'
  className?: string
}

export const ParagraphComponent: React.FC<ParagraphComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'body',
  align = 'left'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'body':
        return `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_BODY}`
      case 'small':
        return 'text-sm text-gray-600'
      case 'large':
        return 'text-xl text-gray-700'
      case 'muted':
        return `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_MUTED}`
      default:
        return `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_BODY}`
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
        return 'text-left'
    }
  }

  return (
    <p 
      id={id} 
      className={`${getVariantClasses()} ${getAlignClasses()} ${className}`}
    >
      {children}
    </p>
  )
}

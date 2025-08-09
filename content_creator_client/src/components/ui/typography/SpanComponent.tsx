import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface SpanComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'body' | 'small' | 'caption' | 'meta' | 'muted'
  className?: string
}

export const SpanComponent: React.FC<SpanComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'body'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'body':
        return `${DESIGN_TOKENS.TEXT_BODY}`
      case 'small':
        return 'text-sm text-gray-600'
      case 'caption':
        return 'text-xs opacity-90'
      case 'meta':
        return 'text-xs opacity-80'
      case 'muted':
        return `${DESIGN_TOKENS.TEXT_MUTED}`
      default:
        return `${DESIGN_TOKENS.TEXT_BODY}`
    }
  }

  return (
    <span 
      id={id} 
      className={`${getVariantClasses()} ${className}`}
    >
      {children}
    </span>
  )
}

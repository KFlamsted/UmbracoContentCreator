import React from 'react'
import { 
  CARD_CLASSES,
  CONTENT_CARD_CLASSES,
  BACKDROP_BLUR_CARD_CLASSES,
  CONTENT_CARD_BACKDROP_BLUR_CLASSES
} from '../../../constants/styles'

interface CardComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'default' | 'content' | 'title'
  hasBackdropBlur?: boolean
  interactive?: boolean
  className?: string
  onClick?: () => void
}

export const CardComponent: React.FC<CardComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'default',
  hasBackdropBlur = false,
  interactive = false,
  onClick
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'content':
        return hasBackdropBlur ? CONTENT_CARD_BACKDROP_BLUR_CLASSES : CONTENT_CARD_CLASSES
      case 'title':
        return hasBackdropBlur ? `${BACKDROP_BLUR_CARD_CLASSES} mb-2` : `${CARD_CLASSES} mb-2`
      case 'default':
      default:
        return hasBackdropBlur ? BACKDROP_BLUR_CARD_CLASSES : CARD_CLASSES
    }
  }

  const getInteractiveClasses = () => {
    return interactive ? 'cursor-pointer transition-transform hover:scale-105' : ''
  }

  return (
    <div 
      id={id} 
      className={`${getVariantClasses()} ${getInteractiveClasses()} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}
